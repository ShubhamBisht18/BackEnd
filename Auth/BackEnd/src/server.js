import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config({
    path: './src/.env'
})


import authRoutes from './routes/AuthRoutes.js'

const port = process.env.PORT || 3000

const app = express()

//Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api/auth',authRoutes)


// Mongoose Connection

mongoose.connect(process.env.MONGO_URI)
.then(()=> app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
}))
.catch((error)=>{
    console.log("DataBase connection is failed: ",error)
})


