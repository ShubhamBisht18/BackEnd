import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Online', 'Cash On Delivery'],
    default: 'Cash On Delivery',
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Ready', 'Received'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
