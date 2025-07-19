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


// 🔐 Promote a user to admin (OPTIONAL: add AdminMiddleware to restrict access)
// router.post("/make-admin", AuthMiddleware, async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   user.role = 'admin';
//   await user.save();

//   res.status(200).json({ message: `${email} is now an admin.` });
// });

export default router
