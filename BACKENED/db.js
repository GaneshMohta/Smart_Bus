const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user:'root',
    password:process.env.Sql_Password,
    database:'SmartBus'
})

connection.connect((err)=>{
    if(err) console.log(err);
    else{
    // console.log("Connected to MySql");
    }
})

module.exports = connection;
