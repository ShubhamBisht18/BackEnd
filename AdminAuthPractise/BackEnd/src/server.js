import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config({
    path: './src/.env'
})

import authRoutes from './routes/authRoutes.js'

const port = process.env.PORT || 3000
const app = express()

// MiddleWare
app.use(cors({origin: process.env.CLIENT_URL,credentials: true}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth',authRoutes)

// Mongoose Connnectivity
const startServer = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`)

        app.listen(port, () =>{
            console.log(`🚀 Server is running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}


startServer()