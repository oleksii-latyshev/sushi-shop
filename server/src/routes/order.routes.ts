import express from 'express';

import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
} from '@/controllers/order.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';
import { validation } from '@/middleware/validation.middleware';
import {
  createOrderValidators,
  updateOrderValidators,
} from '@/utils/validators/order.validators';

const router = express.Router({ mergeParams: true });

router.post('/', createOrderValidators, validation, isAuthenticated, createOrder);
router.get('/', isAuthenticated, getOrders);
router.get('/:id', isAuthenticated, getOrderById);
router.delete('/:id', isAuthenticated, deleteOrderById);
router.patch('/:id', isAuthenticated, updateOrderValidators, validation, updateOrderById);

export default router;
