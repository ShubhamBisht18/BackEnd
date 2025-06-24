import express from 'express';
import { addFood, getAllFood } from '../controllers/foodController.js';

const router = express.Router();
router.post('/add', addFood);
router.get('/', getAllFood);

export default router;
