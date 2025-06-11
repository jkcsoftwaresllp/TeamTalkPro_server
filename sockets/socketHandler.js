const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);

    socket.on('user-online', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('online-users', [...onlineUsers.keys()]);
    });

    socket.on('typing', ({ room, user }) => {
      socket.to(room).emit('show-typing', { user });
    });

    socket.on('stop-typing', ({ room, user }) => {
      socket.to(room).emit('hide-typing', { user });
    });

    socket.on('disconnect', () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit('online-users', [...onlineUsers.keys()]);
      console.log('❌ User disconnected:', socket.id);
    });
  });
};

export default socketHandler;
