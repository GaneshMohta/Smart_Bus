const mysql = require('mysql2');
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const busTravel = require('./Route/travel.js');
const userTravel = require('./Route/userModel.js');
require('dotenv').config();
const loginRouter = require('./Route/LoginModel.js')

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'JaiMahesh#1',
  database: 'SmartBus',
});

app.use('/val',loginRouter);
app.use('/api',busTravel);
app.use('/user',userTravel);
connection.connect((err) => {
  if (err) console.log('MySQL connection error:', err);
  else console.log('Connected to MySQL');
});

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log('Razorpay order creation error:', error);
    res.status(500).send(error);
  }
});

// Verify payment
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_card, amount_paid } = req.body;

  // Check if the user card exists in the database
  const checkCardQuery = `SELECT * FROM user_card WHERE user_card = ?`;

  connection.query(checkCardQuery, [user_card], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database query error', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User card does not exist' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment verified successfully, now update the card amount
      const updateAmountQuery = `UPDATE user_card SET card_amount = card_amount + ? WHERE user_card = ?`;

      connection.query(updateAmountQuery, [amount_paid, user_card], (err, results) => {
        if (err) {
          console.error('Database update error:', err);
          return res.status(500).json({ message: 'Database update error', details: err });
        }

        // Respond with new card amount
        const newAmountQuery = `SELECT card_amount FROM user_card WHERE user_card = ?`;
        connection.query(newAmountQuery, [user_card], (err, amountResults) => {
          if (err) {
            return res.status(500).json({ message: 'Error fetching new card amount', details: err });
          }
          const newAmount = amountResults[0].card_amount;
          res.status(200).json({ message: 'Payment verified successfully', newAmount });
        });
      });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  });
});

app.get("/profile",(req,res)=>{
    const {user_id,bus_id}=req.query;

    if (!user_id && !bus_id) {
      return res.status(400).json({ error: "Missing user_id or bus_id" });
  }
    console.log(user_id , bus_id)
    if(user_id){
      const query =  `select * from user_card where user_id = ?`
      const queryParams = [user_id];

        connection.query(query, queryParams, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.length > 0) {
                return res.status(200).json(results[0]);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        });
    } else if (bus_id) {
        const query = `SELECT * FROM bus WHERE bus_id = ?`;
        const queryParams = [bus_id];

        connection.query(query, queryParams, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.length > 0) {
                return res.status(200).json(results[0]); // Return bus details
            } else {
                return res.status(404).json({ message: 'Bus not found' });
            }
        });
    } else {
        res.status(400).json({ message: 'No user_id or bus_id provided' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
