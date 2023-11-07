import categoryMock from '@/db/mocks/category.mock.json';
import sushiMock from '@/db/mocks/sushi.mock.json';
import Category from '@/db/schemas/category.schema';
import Sushi from '@/db/schemas/sushi.schema';

const checkFullnessDB = async (): Promise<void> => {
  const categoryCount = await Category.count();
  if (categoryCount === 0) {
    await Category.insertMany(categoryMock);
  }

  const sushiCount = await Sushi.count();
  if (sushiCount === 0) {
    const allCategories = await Category.find();

    const sushiData = sushiMock.map((item) => {
      const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
      return {
        ...item,
        category: randomCategory._id,
      };
    });

    await Sushi.insertMany(sushiData);
  }
};

export default checkFullnessDB;
