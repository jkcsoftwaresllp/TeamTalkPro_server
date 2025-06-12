import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import appConfig from "./app.js";
import { connectDB } from "./src/config/db.js";
import { setupSocket } from "./src/config/socket.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Middleware
import errorHandler from "./middleware/error.middleware.js";

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

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);


    // Error handler
    app.use(errorHandler);

    // Socket setup
    setupSocket(io);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();
