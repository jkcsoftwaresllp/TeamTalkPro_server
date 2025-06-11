

module.exports = {
  insertReply: `
    INSERT INTO messages (chat_id, user_id, content, reply_to, type, created_at)
    VALUES (?, ?, ?, ?, 'reply', NOW())
  `,

  upsertReaction: `
    INSERT INTO message_reactions (message_id, user_id, emoji)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE emoji = ?
  `,

  insertForwarded: `
    INSERT INTO messages (chat_id, user_id, content, forwarded_from, type, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `
};
