const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  searchMessages
} = require('../controllers/messageController');

const authMiddleware = require('../middleware/authMiddleware');

// Apply middleware to protect all message routes
router.use(authMiddleware);

router.post('/', createMessage);
router.get('/:chatId/search', searchMessages);
router.get('/:chatId', getMessages);

module.exports = router;
