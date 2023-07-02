import express from 'express';

import { createOrder, getOrders } from '@/controllers/order.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.post('/', isAuthenticated, createOrder);
router.get('/', isAuthenticated, getOrders);

export default router;
