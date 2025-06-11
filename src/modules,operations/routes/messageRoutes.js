import express from 'express';
import {
  replyToMessage,
  reactToMessage,
  forwardMessage,
} from '../controllers/messageController.js';
import verifyToken from '../../../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/messages/reply
router.post('/reply', verifyToken, replyToMessage);

// POST /api/messages/react
router.post('/react', verifyToken, reactToMessage);

// POST /api/messages/forward
router.post('/forward', verifyToken, forwardMessage);

export default router;
