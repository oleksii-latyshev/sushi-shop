import { Request, Response } from 'express';

import { Order } from '@/models/order.model';
import { Sushi } from '@/models/sushi.model';
import { IProduct } from '@/types/order.types';

export const createOrder = async (request: Request, response: Response): Promise<Response> => {
  const { products } = request.body;

  const totalPrice = await products.reduce(
    async (totalPromise: number, { sushiId }: Pick<IProduct, 'sushiId'>) => {
      const total = await totalPromise;
      const currentSushi = await Sushi.findById(sushiId);
      if (!currentSushi) {
        return response.status(404).send({
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

  return response.status(200).send(order);
};

export const getOrders = async (request: Request, response: Response): Promise<Response> => {
  const { page = 1, limit = 9, sort = 'createdAt', order = 'asc', status } = request.query;

  if (request.user && request.user._id) {
    try {
      const ordersTotalCount = await Order.totalCount();
      const orders = await Order.findAllByUserId(request.user?._id, {
        page: +page,
        limit: +limit,
        sort: sort as string,
        order: order as string,
        status: status as string | undefined,
      });
      return response.status(200).send({
        orders,
        totalPages: Math.ceil(ordersTotalCount / +limit),
        currentPage: +page,
      });
    } catch (error) {
      console.log('get orders', error);
      return response.status(500).send({
        message: 'an error occurred on the server side',
      });
    }
  } else {
    return response.status(400).send({
      message: 'invalid body request',
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
      return response.status(409).send({
        message: 'you are not the owner of this order',
        id,
      });
    }

    return response.status(200).send(existedOrder);
  } catch (error) {
    console.error('controller get order by id', error);
    return response.status(500).send({
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
      return response.status(200).send(null);
    } else {
      return response.status(403).send({
        message: 'you are not the owner of this order',
        id,
      });
    }
  } catch (error) {
    console.error('delete order by id', error);
    return response.status(500).send({
      message: 'an error occurred on the server while deleting the order',
    });
  }
};
