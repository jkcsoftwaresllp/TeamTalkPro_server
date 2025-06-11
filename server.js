import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import appConfig from "./app.js"; // renamed to avoid duplicate 'app'
import { setupSocket } from "./src/config/socket.js";
import { connectDB } from "./src/config/db.js";
import chatRoutes from "./src/modules_operations/routes/chatRoutes.js"; // fixed path

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
      },
    });

    app.use(cors());
    app.use(express.json());

    app.use("/api/chats", chatRoutes);

    setupSocket(io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();
