// /controllers/authController.js
import {
  findUserByEmail,
  createUser,
  comparePasswords,
  generateToken,
  getUserProfile,
  updateUserProfile
} from '../services/authService.js';

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    await createUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const profile = await getUserProfile(req.userId);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    await updateUserProfile(req.userId, name, avatar);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
