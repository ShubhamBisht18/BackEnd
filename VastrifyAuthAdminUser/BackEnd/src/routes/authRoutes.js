import express from "express";
import {
  Register,
  verifyOtp,
  Login,
  Logout,
  GetUser,
  forgotPassword,
  verifyResetOtp,      
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
router.post("/verify-reset-otp", verifyResetOtp); 
router.post("/reset-password", resetPassword);  

export default router;

