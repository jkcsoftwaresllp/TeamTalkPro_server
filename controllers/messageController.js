import db from '../config/db.js';

// ✅ GET MESSAGES WITH PAGINATION
export const getMessages = (req, res) => {
  const { chatId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = `
    SELECT COUNT(*) AS total FROM messages WHERE chat_id = ?
  `;

  db.query(countQuery, [chatId], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const query = `
      SELECT * FROM messages
      WHERE chat_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(query, [chatId, limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage,
        hasPrevPage,
        messages: results.reverse() // oldest first
      });
    });
  });
};

// ✅ SEARCH MESSAGES WITH PAGINATION
export const searchMessages = (req, res) => {
  const { chatId } = req.params;
  const keyword = req.query.keyword || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const searchPattern = `%${keyword}%`;

  const countQuery = `
    SELECT COUNT(*) AS total FROM messages
    WHERE chat_id = ? AND content LIKE ?
  `;

  db.query(countQuery, [chatId, searchPattern], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const query = `
      SELECT * FROM messages
      WHERE chat_id = ? AND content LIKE ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(query, [chatId, searchPattern, limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage,
        hasPrevPage,
        messages: results.reverse()
      });
    });
  });
};

// ✅ CREATE A MESSAGE
export const createMessage = (req, res) => {
  const { chat_id, user_id, content } = req.body;

  if (!chat_id || !user_id || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO messages (chat_id, user_id, content) VALUES (?, ?, ?)';

  db.query(sql, [chat_id, user_id, content], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.status(201).json({ message: 'Message created', id: result.insertId });
  });
};
