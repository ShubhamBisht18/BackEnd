import User from "../models/authModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = (id, role = "user") =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const Register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    if (!name || !email || !mobile || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role || "user",
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(
      email,
      "Vastrify - Confirm your email (OTP inside)",
      `Your One-Time Password (OTP) is: ${otp}`
    );

    res.status(201).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user._id, user.role);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const { password, ...userWithoutPassword } = user.toObject();
  res.status(200).json({ token, user: userWithoutPassword });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email first." });

  const token = generateToken(user._id, user.role);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();
  res.status(200).json({ token, user: userWithoutPassword });
};

export const Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const GetUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  user.isOtpVerifiedForReset = false;
  await user.save();

  await sendEmail(
    email,
    "Reset your Vastrify password - OTP inside",
    `Your OTP to reset your password is: ${otp}`
  );

  res.status(200).json({ message: "OTP sent to email" });
};

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isOtpVerifiedForReset = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ message: "OTP verified, you can now reset password" });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.isOtpVerifiedForReset)
    return res.status(400).json({ message: "Unauthorized or session expired" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.isOtpVerifiedForReset = false;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};

