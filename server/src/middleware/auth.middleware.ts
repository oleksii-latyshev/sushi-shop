import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).json({ message: 'User is not authenticated' });
};
