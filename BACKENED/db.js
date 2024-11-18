const mysql = require('mysql2');
const {Client} = require('pg');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.PORT,
    user: process.env.user,
    password: process.env.Sql_Password,
    database: process.env.database,
})


const pgconnection = new Client({
    user: 'postgres',
    host:'localhost',
    database:"SmartBus",
    password:"JaiMahesh#1",
    port:5433
})

pgconnection.connect(function(err){
    if(err) throw err;
    console.log("connected")
})





// connection.connect((err)=>{
//     if(err) console.log(err);
//     else{
//     // console.log("Connected to MySql");
//     }
// })

module.exports = pgconnection;
