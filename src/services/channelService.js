import { db } from '../database/db.js';

export const createChannelService = (channelData, callback) => {
  const { name, description } = channelData;
  const query = 'INSERT INTO channels (name, description) VALUES (?, ?)';
  db.query(query, [name, description], callback);
};

export const getAllChannelsService = (callback) => {
  const query = 'SELECT * FROM channels';
  db.query(query, callback);
};

export const addUserToChannelService = (channelId, userId, callback) => {
  const query = 'INSERT INTO channel_users (channel_id, user_id, status) VALUES (?, ?, ?)';
  db.query(query, [channelId, userId, 'active'], callback);
};

export const removeUserFromChannelService = (channelId, userId, callback) => {
  const query = 'DELETE FROM channel_users WHERE channel_id = ? AND user_id = ?';
  db.query(query, [channelId, userId], callback);
};

export const banUserFromChannelService = (channelId, userId, callback) => {
  const query = 'UPDATE channel_users SET status = ? WHERE channel_id = ? AND user_id = ?';
  db.query(query, ['banned', channelId, userId], callback);
};
