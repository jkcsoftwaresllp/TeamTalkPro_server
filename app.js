// app.js

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware setup
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/messages', messageRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
