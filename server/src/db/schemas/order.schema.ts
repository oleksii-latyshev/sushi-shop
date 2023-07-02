import { model, Schema } from 'mongoose';

import { IOrder } from '@/types/order.types';

const orderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sushi',
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ['accepted', 'completed'],
      default: 'accepted',
    },
  },
  {
    timestamps: true,
  }
);

export default model<IOrder>('Order', orderSchema);
