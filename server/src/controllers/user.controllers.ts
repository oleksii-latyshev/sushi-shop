import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

import { Sushi } from '@/models/sushi.models';
import { User } from '@/models/user.model';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const updateWishlist = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { sushiId } = request.body;

  try {
    const existedSushi = await Sushi.findById(sushiId);

    if (!existedSushi) {
      return CustomResponse.notFound(response, {
        message: `sushi with id = ${sushiId} not found`,
      });
    }

    const updatedUser = await User.toggleWishlistById(request.user?._id as ObjectId, sushiId);

    return CustomResponse.ok(response, updatedUser);
  } catch (error) {
    console.error('update wishlist: ', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server while updating the wishlist',
    });
  }
};

export const getWishlist = async (request: Request, response: Response): Promise<Response> => {
  try {
    const wishlist = await User.getWishlist(request.user?._id as ObjectId);

    return CustomResponse.ok(response, wishlist);
  } catch (error) {
    console.error('get wishlist: ', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server while getting the wishlist',
    });
  }
};
