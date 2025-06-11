const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.verifyUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
