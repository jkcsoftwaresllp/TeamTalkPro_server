import { getChatVolumePerChannelService } from '../services/chatService.js';

export const getChatVolumePerChannel = (req, res) => {
  getChatVolumePerChannelService((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, data: results });
  });
};

import { deleteSpamMessageService } from '../services/chatService.js';

export const deleteSpamMessage = (req, res) => {
  const { messageId } = req.params;

  deleteSpamMessageService(messageId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Message not found' });

    res.json({ message: 'Spam message deleted successfully' });
  });
};
