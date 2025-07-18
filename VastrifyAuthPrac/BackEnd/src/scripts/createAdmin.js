// scripts/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/authModel.js';

dotenv.config({
  path: './src/.env', // adjust if your .env is elsewhere
});

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "admin@vastrify.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@vastrify.com",
      mobile: "9999999999",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin created:", admin.email);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
