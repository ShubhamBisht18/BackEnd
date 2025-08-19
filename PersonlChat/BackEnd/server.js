import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// store mappings
const users = {};       // { username: socketId }
const socketToUser = {}; // { socketId: username }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // user joins with a username
  socket.on("join", (username) => {
    users[username] = socket.id;
    socketToUser[socket.id] = username;
    console.log(`${username} joined with id ${socket.id}`);
  });

  // private message
  socket.on("privateMessage", ({ to, message }) => {
    const receiverId = users[to];
    if (receiverId) {
      const senderName = socketToUser[socket.id]; // get username of sender
      io.to(receiverId).emit("receivePrivateMessage", {
        from: senderName,
        message,
      });
    }
  });

  // handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const username = socketToUser[socket.id];
    if (username) {
      delete users[username];
      delete socketToUser[socket.id];
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
