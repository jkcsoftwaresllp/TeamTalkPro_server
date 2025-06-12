// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import messageRoutes from './routes/messageRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware setup
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/messages', messageRoutes);

// Global error handler
app.use(errorHandler);

export default app;
