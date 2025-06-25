import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import foodRouter from './routes/foodRoutes.js'

dotenv.config({
    path: './src/.env'
})

const port = process.env.PORT || 3000

const app = express();

// Middleware
app.use(cors({origin: 'http://localhost:5173',credentials: true}))
app.use(express.json())

// Routes
app.use('/api/food',foodRouter)

// Mongoose Connectivity
mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
}))
.catch(()=>{
    console.log("Database Connnection Failed!!")
})