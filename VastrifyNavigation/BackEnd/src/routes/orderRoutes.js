import express from "express";
import {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { isAuthenticated, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", isAuthenticated, placeOrder); // User places order
router.get("/my-orders", isAuthenticated, getUserOrders); // User views own orders
router.get("/all", isAuthenticated, AdminMiddleware, getAllOrders); // Admin views all orders
router.put("/:id/status", isAuthenticated, AdminMiddleware, updateOrderStatus); // Admin updates order status

export default router;
