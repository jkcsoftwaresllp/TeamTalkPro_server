const onlineUsers = new Map();

const presenceSocket = (io, socket) => {
  // Mark user as online and broadcast updated user list
  socket.on('userOnline', (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    }
  });

  // Mark user as offline (manually triggered from frontend)
  socket.on('userOffline', (userId) => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    }
  });

  // Notify other users in the chat that someone is typing
  socket.on('typing', ({ chatId, user }) => {
    if (chatId && user) {
      socket.to(chatId).emit('userTyping', user);
    }
  });

  // Notify other users that user stopped typing
  socket.on('stopTyping', ({ chatId, user }) => {
    if (chatId && user) {
      socket.to(chatId).emit('userStoppedTyping', user);
    }
  });

  // On disconnect, remove user from online list
  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit('onlineUsers', Array.from(onlineUsers.keys()));
  });
};

export default presenceSocket;
