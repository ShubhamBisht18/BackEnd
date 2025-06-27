// routes/AuthRoutes.js
import express from 'express';
import {Register,Login,Logout,GetUser} from '../controllers/AuthControllers.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);

// Protected route: Get user details (admin or user)
router.get('/me', AuthMiddleware, GetUser);

export default router;
