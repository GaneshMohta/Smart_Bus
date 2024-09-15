const express = require('express');
const db = require('../db.js')

const router = express.Router();

router.post('/login',async(req,res)=>{
        const {id , password , type} = req.body;
        console.log(type);
        if(type === "user" ){
            const query = `SELECT * FROM user_card WHERE user_id = ? AND user_card = ?`;
            db.query(query, [id, password], (err, results) => {
              if (err) {
                return res.status(500).json({ message: 'Server error', error: err });
              }
              if (results.length > 0) {
                return res.status(200).json({ message: 'User login successful', user: results[0] });
              } else {
                return res.status(401).json({ message: 'Invalid user credentials' });
              }
            });
          } else if (type === 'bus') {
            // Query bus table for validation
            const query = `SELECT * FROM bus WHERE bus_id = ? AND bus_no = ?`;
            db.query(query, [id, password], (err, results) => {
              if (err) {
                return res.status(500).json({ message: 'Server error', error: err });
              }
              if (results.length > 0) {
                return res.status(200).json({ message: 'Bus login successful', bus: results[0] });
              } else {
                return res.status(401).json({ message: 'Invalid bus credentials' });
              }
            });
          } else {
            return res.status(400).json({ message: 'Invalid login type' });
          }
        });

module.exports = router;
