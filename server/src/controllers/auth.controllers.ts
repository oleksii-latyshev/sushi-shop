import { Request, Response } from 'express';

import { IUser } from '@/types/user.types';
import { createResponseUser } from '@/utils/helpers/createResponseUser';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const signInUser = (request: Request, response: Response): Response => {
  return CustomResponse.ok(response, createResponseUser(request.user as IUser));
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
