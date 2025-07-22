import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  role: { type: String, default: "user",enum: ["user", "admin"] },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  isOtpVerifiedForReset: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
