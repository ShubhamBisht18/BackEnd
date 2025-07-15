import express from "express";
import {
  Register,
  verifyOtp,
  Login,
  Logout,
  GetUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/verify-otp", verifyOtp);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", isAuthenticated, GetUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
