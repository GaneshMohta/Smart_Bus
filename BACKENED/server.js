const mysql = require('mysql2');
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const mysql = require('mysql2');
// const express = require('express');
// // const busTravel = require('./Route/travel');
// const Razorpay = require('razorpay');
// const loginRouter = require('./Route/LoginModel');
// const cors = require('cors');
// const crypto = require('crypto')

// const app= express();
// var bodyParser = require('body-parser');
// const e = require('express');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

// require('dotenv').config();

// app.use(express.json());
// // app.use('/api',busTravel);
// // app.use('/val',loginRouter);
// app.use(cors());



// const connection = mysql.createConnection({
//     host: 'localhost',
//     port:'3306',
//     user:'root',
//     password:'JaiMahesh#1',
//     database:'SmartBus'
// })
// connection.connect((err)=>{
//     if(err) console.log(err);
//     else{
//     console.log("Connected to MySql");
//     }
// })



// const PORT = 3000;

// app.get('/',(req,res)=>{
//     res.send('hii');
// })

// const razorpay = new Razorpay({
//     key_id : process.env.RAZORPAY_ID,
//     key_secret : process.env.RAZORPAY_SECRET

// })

// app.post('/create-order', async (req, res) => {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,

//     };

//     try {
//       const response = await razorpay.orders.create(options);
//       res.json({
//         id: response.id,
//         currency: response.currency,
//         amount: response.amount,
//       });
//     } catch (error) {
//     console.log(error);
//       res.status(500).send(error);
//     }
//   });

//   app.post('/verify-payment', (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_card, amount } = req.body;

//     console.log(razorpay_order_id + " " + razorpay_payment_id)
//     // Check if the user card exists in the database
//     const checkCardQuery = `SELECT * FROM user_card WHERE user_card = ?`;

//     connection.query(checkCardQuery, [user_card], (err, results) => {
//       if (err) {
//         console.error('Database query error:', err);
//         return res.status(500).json({ message: 'Database query error', details: err });
//       }
//       if (results.length > 0) {
//       //   return res.status(400).json({ message: 'User card does not exist' });
//       // }

//       const body = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest('hex');

//       if (expectedSignature === razorpay_signature) {
//         // Payment verified successfully, now update the card_amount
//         const updateAmountQuery = `UPDATE user_card SET card_amount = card_amount + ? WHERE user_card = ?`;

//         connection.query(updateAmountQuery, [amount, user_card], (err, results) => {
//           if (err) {
//             console.error('Database update error:', err);
//             return res.status(500).json({ message: 'Database update error', details: err });
//           }

//           res.status(200).json({ message: 'Payment verified and card amount updated successfully' });
//         });
//       } else {
//         res.status(400).json({ message: 'Payment verification failed' });
//       }
//     }
//     else{
//       return res.status(404).json({message:"user not exixt"})
//     }
//     });
//   });


// // app.post('/validate-card',(req,res)=>{
// //     const {user_card} = req.body;
// //     console.log(user_card)
// //     const query = `SELECT * FROM user_card WHERE user_card = ?`;

// //     connection.query(query,[user_card],(err,results)=>{
// //         if(err){
// //             return res.status(500).json({message:'DataBase error'});
// //             console.log(err);
// //         }

// //         if(results.length > 0){
// //             return res.status(200).json({message:"Card Exists", user:results[0]});
// //         }
// //         else{
// //             res.status(400).json({message:"Card does not exist"});
// //             console.log(err)
// //         }
// //     });
// // });


// app.get('/api/bus-travel', (req, res) => {
//     // console.log(req.query)
//     const { bus_id, travel_date, destination } = req.query;

//     // Check if bus_id is provided
//     if (!bus_id) {
//         return res.status(400).json({ error: "bus_id is required" });
//     }
//     // if(bus_id){
//     //     console.log("hii",bus_id)
//     // }
//     let query = `
//         SELECT t.travel_id, t.user_card, u.user_phno, t.amount_debited, t.destination
//         FROM travel t
//         JOIN bus b ON t.bus_id = b.bus_id
//         JOIN user_card u ON t.user_id = u.user_id
//         WHERE b.bus_id = ?
//     `;

//     let queryParams = [bus_id];

//     // If travel_date is provided, add to the query
//     if (travel_date) {
//         query += "    AND t.travel_date = ?";
//         queryParams.push(travel_date);
//     }
//     // console.log(query+" "+queryParams)

//     // If destination is provided, add to the query
//     if (destination) {
//         query += " AND t.destination = ?";
//         queryParams.push(destination);
//     }

//     // Execute the query
//     connection.query(query, queryParams , (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }

//         // If results are found, send them back as JSON
//         res.json(results);
//     });
// });

// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);

// });
