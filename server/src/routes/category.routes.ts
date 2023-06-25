import express from 'express';
import CategoryModel from '../models/category.model';

const router = express.Router({ mergeParams: true });

router.get('/', async (request, response): Promise<void> => {
  try {
    const category = await CategoryModel.find();

    console.log('[GET] categories received');
    response.status(200).send(category);
  } catch (error) {
    console.log('[GET] categories were not received');
    response.send(500).json({
      message: 'categories were not received',
    });
  }
});

export default router;
