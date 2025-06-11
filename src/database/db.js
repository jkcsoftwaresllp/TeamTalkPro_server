import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySql',
  database: 'teamtalkpro_db', 
});

export const connectDB = () => {
  db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.message);
      process.exit(1);
    }
    console.log('Connected to MySQL database');
  });
};
