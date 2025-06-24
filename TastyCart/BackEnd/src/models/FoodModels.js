import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
},{timestamps: true});

export default mongoose.model('Food', foodSchema);
