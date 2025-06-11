import { db } from '../config/db.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename, originalname, mimetype, size, path } = req.file;
    const userId = req.user.id;  // from JWT middleware

    const query = `
      INSERT INTO uploaded_files (user_id, file_name, original_name, mime_type, size, path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [userId, filename, originalname, mimetype, size, path]);

    // Return file URL for frontend (assuming /uploads is served statically)
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    res.status(201).json({
      message: 'File uploaded successfully',
      fileUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};