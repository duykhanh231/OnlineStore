import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// @route   GET /api/products
router.route('/').get(getProducts);

// @route   GET /api/products/:id
router.route('/:id').get(getProductById);

export default router;