import express from 'express';

import { getAllCategories } from '@/controllers/category.controller';

const router = express.Router({ mergeParams: true });

router.get('/', getAllCategories);

export default router;
