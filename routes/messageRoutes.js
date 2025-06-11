// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const {
  replyToMessage,
  reactToMessage,
  forwardMessage
} = require('../controllers/messageController');
const  verifyToken  = require('../middleware/authMiddleware');

// POST /api/messages/reply
router.post('/reply', verifyToken, replyToMessage);

// POST /api/messages/react
router.post('/react', verifyToken, reactToMessage);

// POST /api/messages/forward
router.post('/forward', verifyToken, forwardMessage);

module.exports = router;
