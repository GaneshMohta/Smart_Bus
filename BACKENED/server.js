const mysql = require('mysql2');
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const busTravel = require('./Route/travel.js');
const userTravel = require('./Route/userModel.js');
require('dotenv').config();
const loginRouter = require('./Route/LoginModel.js');
// const mysql = require('mysql2');
const {Client} = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL pgconnection
// const pgconnection = mysql.createpgConnection({
//   host: process.env.host,
//   port: process.env.PORT,
//   user: process.env.user,
//   password: process.env.Sql_Password,
//   database: process.env.database,
// });

const pgconnection = new Client({
  user: process.env.user,
  host:process.env.host,
  database:process.env.database,
  password:process.env.Password,
  port:process.env.PORT
})

pgconnection.connect(function(err){
  if(err) throw err;
  console.log("connected")
})


app.use('/val',loginRouter);
app.use('/api',busTravel);
app.use('/user',userTravel);
// pgconnection.connect((err) => {
//   if (err) console.log('MySQL connection error:', err);
//   else console.log('Connected to MySQL');
// })

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log('Razorpay Order Response:', response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log('Razorpay order creation error:', error);
    res.status(500).json({ message: 'Razorpay order creation failed', error: error.message });
  }
});


app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_card, amount_paid } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_card || !amount_paid) {
    return res.status(400).json({ message: 'All fields are required for payment verification' });
  }

  console.log('Received verification request with:', req.body);

  const checkCardQuery = `SELECT * FROM user_card WHERE user_card = $1`;

  pgconnection.query(checkCardQuery, [user_card], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database query error', details: err });
    }

    if (results.length === 0) {
      console.log('User card does not exist');
      return res.status(404).json({ message: 'User card does not exist' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    console.log('Generated signature:', expectedSignature);
    console.log('Received signature:', razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      console.log('Payment verification successful');

      const updateAmountQuery = `UPDATE user_card SET card_amount = card_amount + $1 WHERE user_card = $2`;

      pgconnection.query(updateAmountQuery, [amount_paid, user_card], (err) => {
        if (err) {
          console.error('Database update error:', err);
          return res.status(500).json({ message: 'Database update error', details: err });
        }

        console.log('Card amount updated successfully');

        const newAmountQuery = `SELECT card_amount FROM user_card WHERE user_card = $1`;
        pgconnection.query(newAmountQuery, [user_card], (err, amountResults) => {
          if (err) {
            console.error('Error fetching new card amount:', err);
            return res.status(500).json({ message: 'Error fetching new card amount', details: err });
          }

          const newAmount = amountResults.card_amount;
          res.status(200).json({ message: 'Payment verified successfully', newAmount });
        });
      });
    } else {
      console.log('Payment verification failed');
      res.status(400).json({ message: 'Payment verification failed' });
    }
  });
});


//Add rows
app.get("/profile",(req,res)=>{
    const {user_id,bus_id}=req.query;
    console.log("ui",user_id)

    if (!user_id && !bus_id) {
      return res.status(400).json({ error: "Missing user_id or bus_id" });
  }

    if(user_id){
      const query =  `select * from user_card where user_id = $1`
      const queryParams = [user_id];

        pgconnection.query(query, queryParams, (err, results) => {
          console.log(results.rows)
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.rows.length > 0) {
              const prof_status = results.rows.filter((e)=>e.user_id === user_id);
              console.log("res",prof_status)
                return res.status(200).json(prof_status);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        });
    } else if (bus_id) {
        const query = `SELECT * FROM bus WHERE bus_id = $1`;
        const queryParams = [bus_id];

        pgconnection.query(query, queryParams, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.rows.length > 0) {
                return res.status(200).json(results.rows);
            } else {
                return res.status(404).json({ message: 'Bus not found' });
            }
        });
    } else {
        res.status(400).json({ message: 'No user_id or bus_id provided' });
    }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth : {
    user : process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

app.post('/register', (req, res) => {
  const { author, name, number, email } = req.body;

  let subject = '';
  let content = '';

  if (author === 'user') {
    subject = 'User Registration';
    content = `
      <p>A new user has registered:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Number:</strong> ${number}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
  } else if (author === 'bus') {
    subject = 'Bus Registration';
    content = `
      <p>A new bus has registered:</p>
      <p><strong>Bus Name:</strong> ${name}</p>
      <p><strong>Bus Number:</strong> ${number}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
  }
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: subject,
    html: content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Registration successful and email sent');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
