import {
  removeUserFromChannelService,
  banUserFromChannelService
} from '../services/channelService.js';

export const removeUserFromChannel = (req, res) => {
  const { channelId, userId } = req.params;
  removeUserFromChannelService(channelId, userId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User removed from channel' });
  });
};

export const banUserFromChannel = (req, res) => {
  const { channelId, userId } = req.params;
  banUserFromChannelService(channelId, userId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User banned from channel' });
  });
};
