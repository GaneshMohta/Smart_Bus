
const express = require('express');
const router = express.Router();
const conn = require('../db');

router.get('/bus-travel', (req, res) => {
    console.log(req.query);
    const { bus_id, travel_date, destination } = req.query;

    if (!bus_id) {
        return res.status(400).json({ error: "bus_id is required" });
    }

    let query = `
    SELECT t.travel_id, t.user_card, u.user_phno, t.amount_debited, t.destination, t.travel_date
    FROM travel t
    JOIN bus b ON t.bus_id = b.bus_id
    JOIN user_card u ON t.user_id = u.user_id
    WHERE b.bus_id = $1
`;

let queryParams = [bus_id];

if (travel_date) {
    query += " AND t.travel_date = $2";
    queryParams.push(travel_date);
}

if (destination) {
    query += ` AND t.destination = $${queryParams.length + 1}`; // Adjust position dynamically
    queryParams.push(destination);
}

    console.log(queryParams);

    conn.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }

        res.json(results.rows);
    });
});

module.exports = router;
