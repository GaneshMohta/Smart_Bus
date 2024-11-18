const {Client} = require('pg');
require('dotenv').config();



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





// connection.connect((err)=>{
//     if(err) console.log(err);
//     else{
//     // console.log("Connected to MySql");
//     }
// })

module.exports = pgconnection;
