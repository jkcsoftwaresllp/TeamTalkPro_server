import { registerUser, loginUser } from '../services/authService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
