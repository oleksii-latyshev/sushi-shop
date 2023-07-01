import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '@/models/user.model';
import { IUser } from '@/types/user.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';

export const signInUser = (request: Request, response: Response): Response => {
  return response.status(200).send(createResponseUser(request.user as IUser));
};

export const signUpUser = async (request: Request, response: Response): Promise<Response> => {
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
};

export const authMe = async (request: Request, response: Response): Promise<Response> => {
  try {
    return response.send(createResponseUser(request.user as IUser));
  } catch (error) {
    return response.send({
      message: 'error on the server side when identifying the user',
      error,
    });
  }
};
