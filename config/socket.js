import { Server } from 'socket.io';
import { handleMessageEvents } from '../sockets/messageSocket.js';

let io;

export const setupSocket = (server) => {
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

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
