import { db } from '../database/db.js';

export const getChatVolumePerChannelService = (callback) => {
  const query = `
    SELECT channel_id, COUNT(*) AS message_count
    FROM messages
    GROUP BY channel_id
  `;
  db.query(query, callback);
};

export const deleteSpamMessageService = (messageId, callback) => {
  const query = 'DELETE FROM messages WHERE id = ?';
  db.query(query, [messageId], callback);
};
