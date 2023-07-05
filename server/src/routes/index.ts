import express from 'express';

import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import orderRoutes from './order.routes';
import sushiRoutes from './sushi.routes';
import userRoutes from './user.routes';

const router = express.Router({ mergeParams: true });

router.use('/sushi', sushiRoutes);
router.use('/categories', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;
