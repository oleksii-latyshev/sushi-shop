import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { IQuery, ISortSushi, Sushi } from '@/models/sushi.model';
import { ISushiReview } from '@/types/sushi.types';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const getAllSushi = async (request: Request, response: Response): Promise<Response> => {
  const { page = 1, limit = 9, sort = 'name', order = 'asc', name, category } = request.query;
  try {
    const orderValue = order === 'asc' ? 1 : order === 'desc' ? -1 : -1;
    const query: IQuery = {};
    if (name) {
      query.name = { $regex: new RegExp(`${name}`, 'i') };
    }
    if (category) {
      query.category = new mongoose.Types.ObjectId(category as string);
    }

    const sortQuery: ISortSushi = {};
    if (sort === 'price') {
      sortQuery['averagePrice'] = orderValue;
    } else if (sort === 'rating') {
      sortQuery['averageRating'] = orderValue;
    } else {
      sortQuery['name'] = orderValue;
    }

    const sushi = await Sushi.findAll({
      query,
      page: +page,
      limit: +limit,
      sort: sortQuery,
    });

    const count = await Sushi.count(query);

    return CustomResponse.ok(response, {
      sushi,
      totalPages: Math.ceil(count / +limit),
      currentPage: +page,
    });
  } catch (error) {
    return CustomResponse.serverError(response, {
      message: `failed to get sushi`,
    });
  }
};

export const getSushiById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  try {
    const sushi = await Sushi.findById(id);
    return CustomResponse.ok(response, sushi);
  } catch (error) {
    console.log(`[GET] sushi by id ${id} unsuccessfully received`);
    return CustomResponse.serverError(response, {
      message: `failed to get sushi by id: ${id}`,
    });
  }
};

export const addReview = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  try {
    const existedSushi = await Sushi.findById(id);

    if (!existedSushi) {
      return CustomResponse.notFound(response, {
        message: `sushi with this id = ${id} does not exist`,
      });
    }

    const review: ISushiReview = {
      ...request.body,
      userId: request.user?._id,
    };

    const updatedSushi = await Sushi.addReviewById(id, review);

    return CustomResponse.created(response, updatedSushi);
  } catch (error) {
    console.error(`add review`);
    return CustomResponse.serverError(response, {
      message: `an error occurred while adding a review. order id = ${id}`,
    });
  }
};
