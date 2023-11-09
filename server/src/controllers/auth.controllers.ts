import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '@/db/schemas/user.schema';
import { IUser } from '@/types/user.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const signInUser = async (request: Request, response: Response): Promise<Response> => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return CustomResponse.notFound(response, {
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return CustomResponse.conflict(response, {
        message: 'Incorrect password.',
      });
    }

    request.login(user, (err) => {
      if (err) {
        console.error('sign in: ', err);
        return CustomResponse.serverError(response, {
          message: 'An error occurred on the server side during sign in',
        });
      }

      return CustomResponse.ok(response, createResponseUser(user));
    });
    return response;
  } catch (error) {
    console.error('sign in: ', error);
    return CustomResponse.serverError(response, {
      message: 'An error occurred on the server side during sign in',
    });
  }
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

    await newUser.save();

    request.login(newUser, (err) => {
      if (err) {
        console.error('sign up: ', err);
        return CustomResponse.serverError(response, {
          message: 'an error occurred on the server side during registration',
        });
      }

      return CustomResponse.created(response, createResponseUser(newUser));
    });
    return response;
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
