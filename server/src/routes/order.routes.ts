import express from 'express';

import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
} from '@/controllers/order.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.post('/', isAuthenticated, createOrder);
router.get('/', isAuthenticated, getOrders);
router.get('/:id', isAuthenticated, getOrderById);
router.delete('/:id', isAuthenticated, deleteOrderById);

export default router;
