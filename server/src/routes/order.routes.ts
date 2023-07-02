import express from 'express';

import { createOrder } from '@/controllers/order.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.post('/', isAuthenticated, createOrder);

export default router;
