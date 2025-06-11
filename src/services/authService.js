import { db } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const loginUser = ({ email }) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
