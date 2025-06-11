import express from 'express';
import {
  removeUserFromChannel,
  banUserFromChannel,
} from '../controller/channelController.js';

import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/:channelId/user/:userId', verifyToken, isAdmin, removeUserFromChannel);
router.put('/:channelId/user/:userId/ban', verifyToken, isAdmin, banUserFromChannel);

export default router;
