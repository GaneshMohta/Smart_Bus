const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Required for SSL on Render
    },
});
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));







// connection.connect((err)=>{
//     if(err) console.log(err);
//     else{
//     // console.log("Connected to MySql");
//     }
// })

module.exports = client;
