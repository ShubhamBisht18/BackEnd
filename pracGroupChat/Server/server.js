import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const port = 3000
const server = http.createServer(app)

// Create Socket.IO server with CORS settings
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

// Store users by socket ID
const users = {}  // { socket.id: userName }

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    // Join a group
    socket.on('join_group', ({ groupName, userName }) => {
        socket.join(groupName)
        users[socket.id] = userName
        console.log(`${userName} joined group: ${groupName}`)

        // Notify everyone in the group
        io.to(groupName).emit('group_notification', {
            text: `${userName} joined the group: ${groupName}`
        })
    })

    // Leave a group
    socket.on('leave_group', ({ groupName }) => {
        const userName = users[socket.id]   // fetch from map
        if (!userName) return              // safety check
        socket.leave(groupName)

        io.to(groupName).emit('group_notification', {
            text: `${userName} left the group: ${groupName}`
        })

        delete users[socket.id]  // remove user from map
    })


    // Send a message to the group
    socket.on('send_group_message', ({ groupName, text }) => {
        const userName = users[socket.id]

        io.to(groupName).emit('receive_group_message', {
            sender: userName,
            text
        })
    })

    // Handle disconnect
    socket.on('disconnect', () => {
        const userName = users[socket.id]
        delete users[socket.id]
        console.log(`User disconnected: ${socket.id} (${userName})`)
    })
})

// Start server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
