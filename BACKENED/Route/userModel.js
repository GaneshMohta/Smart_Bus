const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/Travel',(req,res)=>{

    const {user_id , period} = req.body;
    console.log(user_id);
    if(!user_id) {
        return res.status(400).json({error: "user_id is Required"});
    }

    let query = `Select t.travel_id,u.user_card, t.travel_date, t.destination,b.bus_id,t.amount_debited
    from travel t
    join user_card u on t.user_id = u.user_id
    join bus b on b.bus_id = t.bus_id
    where u.user_id = ?`
    ;

    let queryParams = [user_id];

    if(period === '1week') {
        query += " AND t.travel_date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
    } else if (period === '2weeks') {
        query += " AND t.travel_date >= DATE_SUB(CURDATE(), INTERVAL 2 WEEK)";
    } else if (period === '1month') {
        query += " AND t.travel_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
    } else if (period === '1year') {
        query += " AND t.travel_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
    }

    db.query(query, queryParams, (err,results)=>{
        if(err){
            return res.status(500).json({message:'Databaseerror'});

        }

        res.status(200).json(results);
    })

});

router.get('/curr-trips',(req,res)=>{
    const {user_id} = req.query;
    console.log("HEY",user_id);
    if(!user_id) {
        return res.status(400).json({error: "user_id is Required"});
    }

    let query = `select * from bus_user_records where user_id = ?`

    let queryParams = [user_id];

    db.query(query , [queryParams] ,(err,results)=>{
        if(err){
            res.status(400).json({error: "user_id is Required"});
        }
        res.status(200).json(results);
    })

})

module.exports = router;
