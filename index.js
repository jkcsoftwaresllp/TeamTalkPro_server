const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const socketHandler = require('./sockets/socketHandler');

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// ✅ Create HTTP server & bind to Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ✅ Use the socket handler
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running with Socket.IO on port ${PORT}`);
});
