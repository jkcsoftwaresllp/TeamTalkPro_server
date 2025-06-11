import express from 'express';
import { uploadFile } from '../controllers/fileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { uploadMiddleware } from '../middleware/fileUploadMiddleware.js';
import { fileUploadValidator } from '../middleware/fileUploadValidator.js';

const router = express.Router();

router.post(
  '/upload',
  verifyToken,
  uploadMiddleware.single('file'), 
  fileUploadValidator,
  uploadFile
);

export default router;