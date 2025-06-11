import { pool } from '../config/db.js';

export const saveFileRecord = async (fileData) => {
  const { user_id, file_name, original_name, mime_type, size, path } = fileData;

  const sql = `
    INSERT INTO uploaded_files 
    (user_id, file_name, original_name, mime_type, size, path, uploaded_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  const [result] = await pool.execute(sql, [
    user_id,
    file_name,
    original_name,
    mime_type,
    size,
    path,
  ]);

  return {
    id: result.insertId,
    file_name,
    original_name,
    mime_type,
    size,
    path,
  };
};