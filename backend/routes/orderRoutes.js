import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// This is the most specific route, so it comes first.
router.route('/myorders').get(protect, getMyOrders);

// This is a general route for all orders (admin) or creating an order.
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// These are general routes for a specific order by its ID. They must come last.
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;