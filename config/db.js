const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE
})

pool.getConnection((err, connection) => {
    if(connection){
        console.log('getConnection MySQL DB OK')
    }
    else{
        console.error('getConnection MySQL DB', err)
    }
})

module.exports = { pool }