import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const port = 3000

const server = http.createServer(app)
const io = new Server(server, {
    cors:
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

const users = {}
io.on('connection', (socket) => {
    console.log(`User connected!!: ${socket.id}`)

    socket.on('private_chat', (username) => {
        users[username] = socket.id
        socket.username = username;
        socket.join(username)
        console.log(`${username} joined the chat with id!!: ${users[username]} `)
    })

    socket.on('send_private_message', ({ to, from, text }) => {
        const receivedId = users[to]
        if (receivedId) {
            socket.to(receivedId).emit('receive_private_message', {
                from,
                text
            })
        }
        else {
            console.log(`User ${to} not connected`);
        }
    })
    socket.on('disconnect', () => {
        if (socket.username) {
            delete users[socket.username]; 
        }
        console.log(`User disconnected: ${socket.id}`);
    })
})

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});