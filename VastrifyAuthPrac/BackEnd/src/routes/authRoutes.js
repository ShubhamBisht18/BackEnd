import express from "express"
import {
  Register,
  verifyOTP,
  Login,
  Logout,
  GetUser,
  forgotPassword,
  verifyResetOTP,
  resetPassword
} from '../controllers/authController.js'
import { AuthMiddleware, AdminMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

// 🟢 Public routes
router.post("/register", Register)
router.post("/verify-otp", verifyOTP)
router.post("/login", Login)
router.post("/logout", Logout)

router.post("/forgot-password", forgotPassword)
router.post("/verify-reset-otp", verifyResetOTP)
router.post("/reset-password", resetPassword)

// 🔐 Protected route (logged-in user)
router.get("/me", AuthMiddleware, GetUser)

// 🔐 Admin-only route example
router.get("/admin-data", AuthMiddleware, AdminMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" })
})

export default router
