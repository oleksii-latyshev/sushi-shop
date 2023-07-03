import { Request, Response } from 'express';

import { Order } from '@/models/order.model';
import { Sushi } from '@/models/sushi.model';
import { IProduct } from '@/types/order.types';
import { CustomResponse } from '@/utils/helpers/customResponse';

export const createOrder = async (request: Request, response: Response): Promise<Response> => {
  const { products } = request.body;

  const totalPrice = await products.reduce(
    async (totalPromise: number, { sushiId }: Pick<IProduct, 'sushiId'>) => {
      const total = await totalPromise;
      const currentSushi = await Sushi.findById(sushiId);
      if (!currentSushi) {
        return CustomResponse.notFound(response, {
          message: `sushi with id = ${sushiId} does not exist`,
          sushiId,
        });
      }
      return total + ((currentSushi && currentSushi.price) || 0);
    },
    Promise.resolve(0)
  );

  const order = await Order.create({
    ...request.body,
    user: request.user?.id,
    totalPrice,
  });

  return CustomResponse.ok(response, order);
};

export const getOrders = async (request: Request, response: Response): Promise<Response> => {
  const { page = 1, limit = 9, sort = 'createdAt', order = 'asc', status } = request.query;

  try {
    if (request.user && request.user._id) {
      const ordersTotalCount = await Order.totalCount();
      const orders = await Order.findAllByUserId(request.user?._id, {
        page: +page,
        limit: +limit,
        sort: sort as string,
        order: order as string,
        status: status as string | undefined,
      });
      return CustomResponse.ok(response, {
        orders,
        totalPages: Math.ceil(ordersTotalCount / +limit),
        currentPage: +page,
      });
    } else {
      return CustomResponse.badRequest(response, {
        message: 'invalid body request',
      });
    }
  } catch (error) {
    console.error('get orders', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server side',
    });
  }
};

export const getOrderById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  try {
    const existedOrder = await Order.findById(id);

    if (existedOrder && String(existedOrder.user) !== String(request.user?._id)) {
      return CustomResponse.conflict(response, {
        message: 'you are not the owner of this order',
        id,
      });
    }

    return CustomResponse.ok(response, existedOrder);
  } catch (error) {
    console.error('controller get order by id', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server side while receiving the order',
      id,
    });
  }
};

export const deleteOrderById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const existedOrder = await Order.findById(id as string);

    if (existedOrder && String(existedOrder.user) === String(request.user?._id)) {
      await Order.deleteById(id);
      return CustomResponse.ok(response, null);
    } else {
      return CustomResponse.conflict(response, {
        message: 'you are not the owner of this order',
        id,
      });
    }
  } catch (error) {
    console.error('delete order by id', error);
    return CustomResponse.serverError(response, {
      message: 'an error occurred on the server while deleting the order',
    });
  }
};

export const updateOrderById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const existedOrder = await Order.findById(id as string);

    if (existedOrder && String(existedOrder.user) === String(request.user?._id)) {
      const updatedOrder = await Order.findByIdAndUpdate(id, request.body);
      return CustomResponse.ok(response, updatedOrder);
    }

    if (!existedOrder) {
      return CustomResponse.badRequest(response, {
        message: `order with id = ${id} not found`,
      });
    }
    return CustomResponse.conflict(response, {
      message: `you are not the owner order with id = ${id}`,
    });
  } catch (error) {
    console.error(`update order by id = ${id}`, error);
    return CustomResponse.serverError(response, {
      message: 'server side error when updating order',
    });
  }
};
