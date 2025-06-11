// server.js

require('dotenv').config(); // Ensure env vars are loaded
const http = require('http');
const app = require('./app');
const { setupSocket } = require('./config/socket');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize server and DB
(async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    setupSocket(server);

    server.listen(PORT, () => {
      console.log(` Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();
