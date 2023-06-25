import bcrypt from 'bcryptjs';
import express, { Response } from 'express';
import passport from 'passport';

import User from '@/models/user.model';
import { IUser } from '@/types/user.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';

const router = express.Router({ mergeParams: true });

router.post('/signIn', passport.authenticate('local'), (request, response): Response => {
  return response.status(200).send(createResponseUser(request.user as IUser));
});

router.post('/signUp', async (request, response): Promise<Response> => {
  const { username, password, name } = request.body;

  try {
    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return response.status(409).send({
        message: 'user with this username already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, password: hashedPassword });
    await newUser.save();

    return response.status(201).send(createResponseUser(newUser));
  } catch (error) {
    return response.status(500).send({
      message: 'an error occurred on the server side during registration',
      error,
    });
  }
});

export default router;
