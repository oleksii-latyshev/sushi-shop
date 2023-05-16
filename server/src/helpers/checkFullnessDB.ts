import createInitialEntity from './createInitialEntity';

import sushiMock from '../mocks/sushi.mock.json';
import categoryMock from '../mocks/category.mock.json';
import SushiModel, { ISushiModel } from '../models/Sushi.model';
import { Sushi } from '../types/sushi.type';
import CategoryModel, { ICategoryModel } from '../models/Category.model';
import { Category } from '../types/category.type';

const fillingDB = async (): Promise<void> => {
  const sushi = await SushiModel.find();
  if (sushi.length !== sushiMock.length) {
    await createInitialEntity<ISushiModel, Sushi[]>(SushiModel, sushiMock);
  }

  const category = await CategoryModel.find();
  if (category.length !== categoryMock.length) {
    await createInitialEntity<ICategoryModel, Category[]>(CategoryModel, categoryMock);
  }
};

export default fillingDB;
