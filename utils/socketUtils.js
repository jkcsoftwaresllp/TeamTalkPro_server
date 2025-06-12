const emitToRoom = (io, roomId, event, data) => {
  io.to(roomId.toString()).emit(event, data);
};

module.exports = { emitToRoom };