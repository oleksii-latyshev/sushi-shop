import express from 'express';

import { getAllSushi, getSushiById } from '@/controllers/sushi.controller';

const router = express.Router({ mergeParams: true });

router.get('/', getAllSushi);
router.get('/:id', getSushiById);

export default router;
