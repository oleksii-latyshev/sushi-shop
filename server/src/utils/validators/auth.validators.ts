import { check } from 'express-validator';

export const signUpValidators = [
  check('name', 'the minimum name length is 2 characters')
    .optional()
    .trim()
    .isLength({ min: 2 }),
  check('username', 'the minimum username length is 2 characters').trim().isLength({ min: 2 }),
  check('password', 'the minimum password length is 5 characters').trim().isLength({ min: 5 }),
];

export const signInValidators = [
  check('username', 'the minimum username length is 2 characters').trim().isLength({ min: 2 }),
  check('password', 'the minimum password length is 5 characters').trim().isLength({ min: 5 }),
];
