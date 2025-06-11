import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import channelRoutes from './src/routes/channelRoutes.js'; 
import authRoutes from './src/routes/authRoutes.js'; 
import { connectDB } from './src/database/db.js'; 
import chatRoutes from './src/routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/channel', channelRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/chat', chatRoutes);  

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
