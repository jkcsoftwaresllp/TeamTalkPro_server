import { pool } from '../models/User.model.js';
import { Server } from 'socket.io';

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    // Basic event relay (optional/general)
    socket.on('sendMessage', (data) => {
      io.emit('receiveMessage', data);
    });

    // Join a chat room
    socket.on('join-chat', (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    // Handle real-time chat message
    socket.on('send-message', async ({ chatId, senderId, content }) => {
      const message = { chatId, senderId, content, createdAt: new Date() };
      try {
        await db.execute(
          'INSERT INTO messages (chat_id, sender_id, content) VALUES (?, ?, ?)',
          [chatId, senderId, content]
        );
        io.to(`chat-${chatId}`).emit('receive-message', message);
      } catch (err) {
        console.error('Error inserting message:', err.message);
      }
    });
  });
};
