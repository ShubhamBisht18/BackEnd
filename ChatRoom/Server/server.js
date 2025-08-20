// import { group } from 'console'
// import express from 'express'
// import http from 'http'
// import { Server } from 'socket.io'

// const port = 3000
// const app = express()

// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// })

// io.on('connection', (socket) => {
//     console.log(`User Connected!! ${socket.id}`)

//     socket.on('group', (groupName, userName) => {
//         socket.join(groupName)
//         console.log(`${userName} joined group: ${groupName}`)

//         socket.to(groupName).emit('group_notification', {
//             message: `${userName} has joined the group`,
//         })
//     })



//     socket.on('send_group_message', (groupName, userName, text) => {
//         socket.to(groupName).emit('receive_group_message', {
//             sender: userName,
//             text
//         })
//     })

//     socket.on('leave_group', (groupName, userName) => {
//         socket.leave(groupName)
//         socket.to(groupName).emit('group_notification', {
//             message: `${userName} left the group`,
//         })
//     })

//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// })

// server.listen(port, () => {
//     console.log(`Server is running at port : ${port}`)

// })


import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = 3000
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Join group
  socket.on("join_group", ({ groupName, userName }) => {
    socket.join(groupName);
    console.log(`${userName} joined group: ${groupName}`);

    // Notify everyone (including sender)
    io.to(groupName).emit("group_notification", {
      text: `${userName} joined the group ${groupName}`
    });
  });

  // Leave group
  socket.on("leave_group", ({ groupName, userName }) => {
    socket.leave(groupName);
    console.log(`${userName} left group: ${groupName}`);

    io.to(groupName).emit("group_notification", {
      text: `${userName} left the group ${groupName}`
    });
  });

  // Send group message
  socket.on("send_group_message", ({ groupName, userName, text }) => {
    io.to(groupName).emit("receive_group_message", {
      sender: userName,
      text
    });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
