import express from 'express';
import {
  getChatVolumePerChannel,
  deleteSpamMessage
} from '../controller/chatController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/volume', verifyToken, isAdmin, getChatVolumePerChannel);
router.delete('/spam/:messageId', verifyToken, isAdmin, deleteSpamMessage);

export default router;
