import { getAllUsersService } from '../services/userService.js';

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
