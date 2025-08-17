import express from "express";
import http from 'http'
import { Server } from "socket.io";
// import { text } from "stream/consumers";

const port = 3000

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})


io.on("connection", (socket) => {
    console.log("User Connected!!!",socket.id)
    socket.on("sendMessage", (mssg) => {
        io.emit("receiveMessage", mssg)
    })
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})