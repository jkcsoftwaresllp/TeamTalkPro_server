import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import fileRoutes from './src/routes/fileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/upload', fileRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds 10MB limit.' });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});