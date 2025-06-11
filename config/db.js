// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function connectDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 10,
    });
    console.log('✅ MySQL connected');
  }
  return pool;
}

function getDB() {
  if (!pool) throw new Error('DB not connected');
  return pool;
}

module.exports = { connectDB, getDB };
