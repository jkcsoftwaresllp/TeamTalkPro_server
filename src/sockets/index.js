import messageSocket from './messageSocket.js';
import presenceSocket from './presenceSocket.js';

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Init message events
    messageSocket(io, socket);

    // Init presence events
    presenceSocket(io, socket);

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};

export default setupSocket;
