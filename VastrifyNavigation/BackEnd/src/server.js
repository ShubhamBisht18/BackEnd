import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'

dotenv.config({
    path: './src/.env'
})

import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


const port = process.env.PORT || 3000
const app = express();

app.use(cors({origin:process.env.CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET 
})

// Order creation route
app.post('/api/payment', async(req , res) =>{
  const option = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  }
  try {
    const order = await razorpay.orders.create(option)
    res.status(200).json(order)
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
})

// Payment verification route
app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use("/api/review", reviewRoutes);
app.use('/api/orders', orderRoutes)


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
