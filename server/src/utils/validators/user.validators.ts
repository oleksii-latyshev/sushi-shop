import { check } from 'express-validator';

export const updateWishlistValidators = [
  check('sushiId', 'sushi id must be a string').isString(),
];
