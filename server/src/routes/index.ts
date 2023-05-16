import express from 'express';

import sushiRoute from './sushi.route';

const router = express.Router({ mergeParams: true });

router.use('/sushi', sushiRoute);

export default router;
