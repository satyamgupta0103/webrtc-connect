import express from "express";
import { Server } from "socket.io";
import http from "http";

// Create an Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity; need to configure in production
    methods: ["GET", "POST"],
  },
});

// Serve a simple test route (optional)
app.get("/", (req, res) => {
  res.send("WebRTC Signaling Server is running!");
});

//Handle WebRTC signaling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event: A user joins a specific room
  socket.on("join-room", (roomId) => {
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.join(roomId); // Join the room
    socket.to(roomId).emit("user-connected", socket.id); // Notify others in the room
  });

  // Event: Send an offer: Facilitate WebRTC peer-to-peer connection by exchanging SDP offers
  socket.on("offer", ({ offer, to }) => {
    console.log(`Offer from ${socket.id} to ${to}`);
    socket.to(to).emit("offer", { offer, from: socket.id });
  });

  // Event: Send an answer
  socket.on("answer", ({ answer, to }) => {
    console.log(`Answer from ${socket.id} to ${to}`);
    socket.to(to).emit("answer", { answer, from: socket.id });
  });

  // Event: Send ICE candidates
  socket.on("ice-candidate", ({ candidate, to }) => {
    console.log(`ICE Candidate from ${socket.id} to ${to}`);
    socket.to(to).emit("ice-candidate", { candidate, from: socket.id });
  });

  // Event: User disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
