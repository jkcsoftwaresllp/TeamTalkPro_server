import express from 'express';
import { listUsers } from '../controller/userController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, listUsers);

export default router;
