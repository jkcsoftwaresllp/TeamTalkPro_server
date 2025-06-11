
const { getDB } = require('../config/db');

exports.createReply = async (originalMessageId, userId, replyContent) => {
  const db = getDB();
  const [rows] = await db.query('SELECT chat_id FROM messages WHERE id = ?', [originalMessageId]);
  if (!rows.length) throw new Error('Original message not found');
  const chatId = rows[0].chat_id;

  const [result] = await db.query(
    'INSERT INTO messages (chat_id, sender_id, content, reply_to) VALUES (?, ?, ?, ?)',
    [chatId, userId, replyContent, originalMessageId]
  );

  return {
    id: result.insertId,
    chat_id: chatId,
    sender_id: userId,
    content: replyContent,
    reply_to: originalMessageId,
    created_at: new Date()
  };
};

exports.addReaction = async (messageId, userId, reaction) => {
  const db = getDB();
  await db.query(
    'INSERT INTO message_reactions (message_id, user_id, reaction) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reaction = ?',
    [messageId, userId, reaction, reaction]
  );
  const [msgRows] = await db.query('SELECT chat_id FROM messages WHERE id = ?', [messageId]);
  if (!msgRows.length) throw new Error('Message not found');

  return {
    message_id: messageId,
    user_id: userId,
    reaction,
    chat_id: msgRows[0].chat_id
  };
};

exports.forwardMessage = async (messageId, userId, targetChatId) => {
  const db = getDB();
  const [orig] = await db.query('SELECT content FROM messages WHERE id = ?', [messageId]);
  if (!orig.length) throw new Error('Original message not found');
  const content = orig[0].content;

  const [result] = await db.query(
    'INSERT INTO messages (chat_id, sender_id, content, forwarded_from) VALUES (?, ?, ?, ?)',
    [targetChatId, userId, content, messageId]
  );

  return {
    id: result.insertId,
    chat_id: targetChatId,
    sender_id: userId,
    content,
    forwarded_from: messageId,
    created_at: new Date()
  };
};
