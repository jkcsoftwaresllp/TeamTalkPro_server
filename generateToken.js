// generateToken.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sample payload — replace with actual user details if needed
const userPayload = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

// Use JWT_SECRET from .env if available, fallback to default
const secret = process.env.JWT_SECRET || 'nothingsecretinjwttoken';

const token = jwt.sign(userPayload, secret, { expiresIn: '7d' });

console.log('\n✅ JWT Token Generated Successfully:\n');
console.log(token);
