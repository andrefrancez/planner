require('dotenv').config()
const mySql = require('mysql2')
const { OBSERVATIONS_DB_HOST, OBSERVATIONS_DB_USER, OBSERVATIONS_DB_DATABASE, OBSERVATIONS_DB_PASSWORD, OBSERVATIONS_DB_PORT } = process.env

const pool = mySql.createPool({
    host: OBSERVATIONS_DB_HOST,
    user: OBSERVATIONS_DB_USER,
    database: OBSERVATIONS_DB_DATABASE,
    password: OBSERVATIONS_DB_PASSWORD,
    port: OBSERVATIONS_DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  module.exports = pool.promise();