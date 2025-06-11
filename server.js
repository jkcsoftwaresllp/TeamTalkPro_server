require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = require('./app'); // if your express config is modularized
const { setupSocket } = require('./config/socket');
const { connectDB } = require('./config/db');
const chatRoutes = require('./src/modules,operations/routes/chatRoutes.js');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
      },
    });

    app.use(cors());
    app.use(express.json());

    app.use('/api/chats', chatRoutes);

    setupSocket(io); // or chatSocket(io) if you're not using setupSocket

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();
