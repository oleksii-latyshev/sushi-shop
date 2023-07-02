import express from 'express';

import { getAllSushi, getSushiById } from '@/controllers/sushi.controllers';

const router = express.Router({ mergeParams: true });

router.get('/', getAllSushi);
router.get('/:id', getSushiById);

export default router;
