import express from 'express';

import { getAllCategories } from '@/controllers/category.controllers';

const router = express.Router({ mergeParams: true });

router.get('/', getAllCategories);

export default router;
