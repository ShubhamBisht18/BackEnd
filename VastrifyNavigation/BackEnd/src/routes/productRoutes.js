import express from 'express';
import { addItem, getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.post('/add-item', addItem);
router.get('/', getAllProducts);
router.get('/:id', getProductById); // 👈 for /cart/:id

export default router;
