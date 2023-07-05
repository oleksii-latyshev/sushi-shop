import express from 'express';

import { updateWishlist } from '@/controllers/user.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.patch('/wishlist', isAuthenticated, updateWishlist);

export default router;
