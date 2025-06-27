import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config({
  path: './src/.env'
});

import authRoutes from './routes/AuthRoutes.js';

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// ✅ MongoDB Connection with recommended options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Mongoose connected');
  // ✅ Log actual DB name
  console.log('✅ Connected to DB:', mongoose.connection.name);
  // Start server
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
})
.catch((error) => {
  console.log('❌ Database connection failed:', error);
});
