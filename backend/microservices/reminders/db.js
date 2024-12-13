require('dotenv').config()
const mySql = require('mysql2')
const { REMINDER_DB_HOST, REMINDER_DB_USER, REMINDER_DB_DATABASE, REMINDER_DB_PASSWORD, REMINDER_DB_PORT } = process.env

const pool = mySql.createPool({
    host: REMINDER_DB_HOST,
    user: REMINDER_DB_USER,
    database: REMINDER_DB_DATABASE,
    password: REMINDER_DB_PASSWORD,
    port: REMINDER_DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  module.exports = pool.promise();