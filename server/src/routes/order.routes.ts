import express from 'express';

import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
} from '@/controllers/order.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.post('/', isAuthenticated, createOrder);
router.get('/', isAuthenticated, getOrders);
router.get('/:id', isAuthenticated, getOrderById);
router.delete('/:id', isAuthenticated, deleteOrderById);
router.patch('/:id', isAuthenticated, updateOrderById);

export default router;
