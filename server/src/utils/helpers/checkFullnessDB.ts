import categoryMock from '@/db/mocks/category.mock.json';
import sushiMock from '@/db/mocks/sushi.mock.json';
import Category from '@/models/category.model';
import Sushi from '@/models/sushi.model';
import { ICategory } from '@/types/category.types';
import { ISushi } from '@/types/sushi.types';

import createInitialEntity from './createInitialEntity';

const fillingDB = async (): Promise<void> => {
  const sushi = await Sushi.find();
  if (sushi.length !== sushiMock.length) {
    await createInitialEntity<ISushi, unknown>(Sushi, sushiMock);
  }

  const category = await Category.find();
  if (category.length !== categoryMock.length) {
    await createInitialEntity<ICategory, unknown>(Category, categoryMock);
  }
};

export default fillingDB;
