// import express from "express";
// import {
//   Register,
//   verifyOtp,
//   Login,
//   Logout,
//   GetUser,
//   forgotPassword,
//   verifyResetOtp,      
//   resetPassword,
// } from "../controllers/authController.js";

// import { isAuthenticated, AdminMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", Register);
// router.post("/verify-otp", verifyOtp);
// router.post("/login", Login);
// router.post("/logout", Logout);

// router.post("/forgot-password", forgotPassword);
// router.post("/verify-reset-otp", verifyResetOtp); 
// router.post("/reset-password", resetPassword);  

// router.get("/me", isAuthenticated, GetUser);

// router.get("/admin-data", isAuthenticated, AdminMiddleware, (req, res) => {
//   res.json({ message: "Welcome Admin!" });
// });


// export default router;

// src/routes/authRoutes.js
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

import { isAuthenticated, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public auth routes
router.post("/register", Register);
router.post("/verify-otp", verifyOtp);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

// Authenticated user info
router.get("/me", isAuthenticated, GetUser);

// Admin-only test route
router.get("/admin-data", isAuthenticated, AdminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
