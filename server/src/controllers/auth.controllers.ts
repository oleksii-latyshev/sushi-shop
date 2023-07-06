import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '@/db/schemas/user.schema';
import { IUser } from '@/types/user.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const signInUser = (request: Request, response: Response): Response => {
  return CustomResponse.ok(response, createResponseUser(request.user as IUser));
};

export const signUpUser = async (request: Request, response: Response): Promise<Response> => {
  const { username, password, name } = request.body;

  try {
    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return CustomResponse.conflict(response, {
        message: 'user with this username already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, password: hashedPassword });

    return CustomResponse.created(response, createResponseUser(newUser));
  } catch (error) {
    console.error('sign up: ', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server side during registration',
    });
  }
};

export const authMe = async (request: Request, response: Response): Promise<Response> => {
  try {
    return CustomResponse.ok(response, createResponseUser(request.user as IUser));
  } catch (error) {
    console.error('auth me error: ', error);
    return CustomResponse.serverError(response, {
      message: 'error on the server side when identifying the user',
      error,
    });
  }
};

export const logout = async (request: Request, response: Response): Promise<void> => {
  request.session.destroy((error: string) => {
    if (error) {
      console.error('logout', error);
      CustomResponse.serverError(response, {
        message: 'server error logout',
      });
    }

    response.clearCookie('connect.sid');

    CustomResponse.ok(response, null);
  });
};
