import express from 'express';

import sushiRoute from './sushi.route';
import categoryRoute from './category.route';

const router = express.Router({ mergeParams: true });

router.use('/sushi', sushiRoute);
router.use('/categories', categoryRoute);

export default router;
