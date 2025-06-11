// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export async function connectDB() {
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

export function getDB() {
  if (!pool) throw new Error('DB not connected');
  return pool;
}
