import { check } from 'express-validator';

export const createOrderValidators = [
  check('products', 'to create an order, you need at least 1 product in it').isArray({
    min: 1,
  }),
  check('products.*.sushiId').trim().isString(),
  check('products.*.variant').isInt({ min: 0 }),
  check('products.*.count').optional().isInt({ min: 1 }),
];

export const updateOrderValidators = [
  check('status', 'order status can be either accepted or completed')
    .trim()
    .isIn(['accepted', 'completed']),
];
