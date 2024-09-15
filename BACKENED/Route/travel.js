// const express = require('express');
// const router = express.Router();
// const conn = require('../db');  // Assuming `conn` is the MySQL connection object

// router.get('/bus-travel', (req, res) => {
//     console.log(req.query)
//     const { bus_id, travel_date, destination } = req.query;

//     // Check if bus_id is provided
//     if (!bus_id) {
//         return res.status(400).json({ error: "bus_id is required" });
//     }
//     if(bus_id){
//         console.log("hii",bus_id)
//     }
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
//         query += " AND t.travel_date = ?";
//         queryParams.push(travel_date);
//     }

//     // If destination is provided, add to the query
//     if (destination) {
//         query += " AND t.destination = ?";
//         queryParams.push(destination);
//     }

//     // Execute the query
//     conn.query(query, [bus_id], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }

//         // If results are found, send them back as JSON
//         res.json(results);
//     });
// });

// module.exports = router;
