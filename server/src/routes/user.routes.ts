import express from 'express';

import { getWishlist, updateWishlist } from '@/controllers/user.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';
import { validation } from '@/middleware/validation.middleware';
import { updateWishlistValidators } from '@/utils/validators/user.validators';

const router = express.Router({ mergeParams: true });

router.get('/wishlist', isAuthenticated, getWishlist);
router.patch(
  '/wishlist',
  isAuthenticated,
  updateWishlistValidators,
  validation,
  updateWishlist
);

export default router;
