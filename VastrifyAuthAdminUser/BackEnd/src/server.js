import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config({
    path: './src/.env'
})

import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js'


const port = process.env.PORT || 3000
const app = express();

app.use(cors({origin:process.env.CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth',authRoutes)


// MongoDB Connnection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
