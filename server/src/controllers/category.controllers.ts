import { Request, Response } from 'express';

import Category from '@/db/schemas/category.schema';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const getAllCategories = async (_: Request, response: Response): Promise<Response> => {
  try {
    const category = await Category.find();

    return CustomResponse.ok(response, category);
  } catch (error) {
    console.error('get all categories error: ', error);
    return CustomResponse.serverError(response, {
      message: 'categories were not received',
    });
  }
};
