import { Request, Response } from 'express';

import Category from '@/models/category.model';

export const getAllCategories = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const category = await Category.find();

    console.log('[GET] categories received');
    return response.status(200).send(category);
  } catch (error) {
    console.log('[GET] categories were not received');
    return response.send(500).json({
      message: 'categories were not received',
    });
  }
};
