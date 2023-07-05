import express from 'express';

import { getWishlist, updateWishlist } from '@/controllers/user.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.get('/wishlist', isAuthenticated, getWishlist);
router.patch('/wishlist', isAuthenticated, updateWishlist);

export default router;
