// /services/authService.js
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const findUserByEmail = async (email) => {
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return users[0];
};

export const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
};

export const comparePasswords = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const getUserProfile = async (userId) => {
  const [users] = await pool.query('SELECT id, name, email, avatar FROM users WHERE id = ?', [userId]);
  return users[0];
};

export const updateUserProfile = async (userId, name, avatar) => {
  await pool.query('UPDATE users SET name = ?, avatar = ? WHERE id = ?', [name, avatar, userId]);
};
