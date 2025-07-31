import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  size: String,
  quantity: Number,
  gender: { type: String, enum: ['men', 'women'], required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
