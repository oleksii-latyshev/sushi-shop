import { Request, Response } from 'express';

import { Order } from '@/models/order.model';
import { Sushi } from '@/models/sushi.model';
import { ISushi } from '@/types/sushi.types';

export const createOrder = async (request: Request, response: Response): Promise<Response> => {
  const { products } = request.body;

  const totalPrice = await products.reduce(
    async (totalPromise: number, id: Pick<ISushi, '_id'>) => {
      const total = await totalPromise;
      const currentSushi = await Sushi.findById(id);
      if (!currentSushi) {
        return response.status(404).send({
          message: `sushi with id = ${id} does not exist`,
          id,
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
