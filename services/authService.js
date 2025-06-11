const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.verifyUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';

    db.query(query, [email], async (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) return resolve(null);

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return resolve(null);

      resolve(user);
    });
  });
};
