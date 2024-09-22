const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.PORT,
    user: process.env.user,
    password: process.env.Sql_Password,
    database: process.env.database,
})

connection.connect((err)=>{
    if(err) console.log(err);
    else{
    // console.log("Connected to MySql");
    }
})

module.exports = connection;
