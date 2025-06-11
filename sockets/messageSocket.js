const messageService = require("../src/modules,operations/services/messageService");

module.exports = (io, socket) => {
  socket.on(
    "replyMessage",
    async ({ originalMessageId, replyContent, userId }) => {
      try {
        const reply = await messageService.createReply(
          originalMessageId,
          userId,
          replyContent
        );
        io.to(reply.chat_id.toString()).emit("newReply", reply);
      } catch (err) {
        console.error("Error replying to message via socket:", err.message);
      }
    }
  );

  socket.on("reactMessage", async ({ messageId, reaction, userId }) => {
    try {
      const result = await messageService.addReaction(
        messageId,
        userId,
        reaction
      );
      io.to(result.chat_id.toString()).emit("newReaction", {
        messageId,
        userId,
        reaction,
      });
    } catch (err) {
      console.error("Error reacting to message via socket:", err.message);
    }
  });

  socket.on("forwardMessage", async ({ messageId, targetChatId, userId }) => {
    try {
      const forwarded = await messageService.forwardMessage(
        messageId,
        userId,
        targetChatId
      );
      io.to(targetChatId.toString()).emit("messageForwarded", forwarded);
    } catch (err) {
      console.error("Error forwarding message via socket:", err.message);
    }
  });
};
