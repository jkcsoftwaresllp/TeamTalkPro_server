const messageSocket = require('./messageSocket');
const presenceSocket = require('./presenceSocket');

module.exports = (io) => {
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
