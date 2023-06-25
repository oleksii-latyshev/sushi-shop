import express from 'express';
import passport from 'passport';

import { signInUser, signUpUser } from '@/controllers/auth.controller';

const router = express.Router({ mergeParams: true });

router.post('/signIn', passport.authenticate('local'), signInUser);
router.post('/signUp', signUpUser);

export default router;
