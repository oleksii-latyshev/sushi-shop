import express from 'express';
import passport from 'passport';

import { authMe, logout, signInUser, signUpUser } from '@/controllers/auth.controllers';
import { isAuthenticated } from '@/middleware/auth.middleware';
import { validation } from '@/middleware/validation.middleware';
import { signInValidators, signUpValidators } from '@/utils/validators/auth.validators';

const router = express.Router({ mergeParams: true });

router.post(
  '/signIn',
  signInValidators,
  validation,
  passport.authenticate('local'),
  signInUser
);
router.post('/signUp', signUpValidators, validation, signUpUser);
router.get('/me', isAuthenticated, authMe);
router.post('/logout', isAuthenticated, logout);

export default router;
