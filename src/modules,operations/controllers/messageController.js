const messageService = require("../services/messageService");
const { getIO } = require("../../../config/socket");

exports.replyToMessage = async (req, res, next) => {
  try {
    const { originalMessageId, replyContent } = req.body;
    const userId = req.user.id;

    const replyMessage = await messageService.createReply(
      originalMessageId,
      userId,
      replyContent
    );

    getIO().to(replyMessage.chat_id.toString()).emit("newReply", replyMessage);

    res.status(201).json({ message: "Reply sent", data: replyMessage });
  } catch (err) {
    next(err);
  }
};

exports.reactToMessage = async (req, res, next) => {
  try {
    const { messageId, reaction } = req.body;
    const userId = req.user.id;

    const reactionResult = await messageService.addReaction(
      messageId,
      userId,
      reaction
    );

    getIO().to(reactionResult.chat_id.toString()).emit("newReaction", {
      messageId,
      userId,
      reaction,
    });

    res.status(200).json({ message: "Reaction added", data: reactionResult });
  } catch (err) {
    next(err);
  }
};

exports.forwardMessage = async (req, res, next) => {
  try {
    const { messageId, targetChatId } = req.body;
    const userId = req.user.id;

    const forwarded = await messageService.forwardMessage(
      messageId,
      userId,
      targetChatId
    );

    getIO().to(targetChatId.toString()).emit("messageForwarded", forwarded);

    res.status(201).json({ message: "Message forwarded", data: forwarded });
  } catch (err) {
    next(err);
  }
};
