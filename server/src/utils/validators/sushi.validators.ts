import { check } from 'express-validator';

export const addReviewValidators = [
  check('text', 'review text must be 2 or more characters')
    .trim()
    .isLength({ min: 2 })
    .isString(),
  check('rating', 'rating must be from 1 to 10').trim().isInt({ min: 1, max: 10 }),
];
