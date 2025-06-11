// config/socket.js

const { handleMessageEvents } = require('../sockets/messageSocket');

let io;

const setupSocket = (server) => {
  const { Server } = require('socket.io');

  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Register message-related events (reply, reaction, forward)
    handleMessageEvents(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

module.exports = { setupSocket, getIO };
