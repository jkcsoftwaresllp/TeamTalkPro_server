import express from 'express';
import {
  createMessage,
  getMessages,
  searchMessages
} from '../controllers/messageController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply middleware to protect all message routes
router.use(authMiddleware);

router.post('/', createMessage);
router.get('/:chatId/search', searchMessages);
router.get('/:chatId', getMessages);

export default router;
