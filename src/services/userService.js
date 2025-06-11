import { db } from '../database/db.js';

export const getAllUsersService = () => {
  const query = `SELECT id, username, email, role, status, created_at FROM users`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
