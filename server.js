import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chatRoutes.js';
import errorHandler from './middleware/error.middleware.js';
import { setupSocket } from './socket/index.js';
import { config } from 'dotenv';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20; // or a higher number if needed

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chats', chatRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setupSocket(server);
});
