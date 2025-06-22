import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './src/routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

const app = express();


// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    }))
    .catch((err) => {
        console.log("DataBase connection is failed: ", err)
    })