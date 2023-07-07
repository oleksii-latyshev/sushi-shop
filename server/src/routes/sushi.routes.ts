import express from 'express';

import { addReview, getAllSushi, getSushiById } from '@/controllers/sushi.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';
import { validation } from '@/middleware/validation.middleware';
import { addReviewValidators } from '@/utils/validators/sushi.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllSushi);
router.get('/:id', getSushiById);
router.post('/:id', isAuthenticated, addReviewValidators, validation, addReview);

export default router;
