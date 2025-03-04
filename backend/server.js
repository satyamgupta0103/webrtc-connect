import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import Routes from "./app/routes.js"; // Add .js extension for ESM
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;

app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  Routes,
]);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (modify as needed)
    methods: ["GET", "POST"],
  },
});

// Pass 'io' to socketManager
io.on("connection", (socket) => {
  socketManager(socket, io);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
