import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";

const port = process.env.PORT || 3000
dotenv.config({ path: './src/.env' });
const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).send("Error creating order");
  }
});

app.listen(port, () => console.log("Server running at port 5000"));