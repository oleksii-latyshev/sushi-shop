import express from 'express';
import passport from 'passport';

import { authMe, signInUser, signUpUser } from '@/controllers/auth.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.post('/signIn', passport.authenticate('local'), signInUser);
router.post('/signUp', signUpUser);
router.get('/me', isAuthenticated, authMe);

export default router;
