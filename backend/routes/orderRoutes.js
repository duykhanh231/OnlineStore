import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// For creating an order (user) and getting all orders (admin)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// For getting a single order by its ID
router.route('/:id').get(protect, getOrderById);

// For updating an order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);

// For an admin to update an order to delivered
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;