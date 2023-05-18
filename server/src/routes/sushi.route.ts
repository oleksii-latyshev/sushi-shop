import express from 'express';

import SushiModel from '../models/Sushi.model';

interface Query {
  name?: { $regex: RegExp } | string;
  category?: string;
}

const router = express.Router({ mergeParams: true });

router.get('/', async (request, response): Promise<void> => {
  const { page = 1, limit = 9, sort = 'name', order = 'asc', name, category } = request.query;
  try {
    const orderValue = order === 'asc' ? 1 : order === 'desc' ? -1 : -1;
    const query: Query = {};
    if (name) {
      query.name = { $regex: new RegExp(`${name}`, 'i') };
    }
    if (category) {
      query.category = category as string;
    }

    const sushi = await SushiModel.find(query)
      .sort({ [sort as string]: orderValue })
      .limit(+limit * 1)
      .skip((+page - 1) * +limit)
      .exec();

    const count = await SushiModel.countDocuments();
    console.log('[GET] sushi requested successfully');
    response.status(200).send({
      sushi,
      totalPages: Math.ceil(count / +limit),
      currentPage: +page,
    });
  } catch (error) {
    console.log('[GET] sushi requested unsuccessfully');

    response.status(500).json({
      message: `failed to get sushi`,
    });
  }
});

router.get('/:sushiId', async (request, response): Promise<void> => {
  const { sushiId } = request.params;
  try {
    const sushi = await SushiModel.findById(sushiId);
    console.log(`[GET] sushi by id ${sushiId} successfully received`);
    response.status(200).send(sushi);
  } catch (error) {
    console.log(`[GET] sushi by id ${sushiId} unsuccessfully received`);
    response.status(500).json({
      message: `failed to get sushi by id: ${sushiId}`,
    });
  }
});

export default router;
