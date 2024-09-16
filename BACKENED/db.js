const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user:'root',
    password:'JaiMahesh#1',
    database:'SmartBus'
})

connection.connect((err)=>{
    if(err) console.log(err);
    else{
    // console.log("Connected to MySql");
    }
})

module.exports = connection;
