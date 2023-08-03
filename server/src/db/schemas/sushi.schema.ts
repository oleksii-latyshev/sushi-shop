import { model, Schema } from 'mongoose';

import { ISushi } from '@/types/sushi.types';

const sushiSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        count: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        _id: false,
      },
    ],
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        rating: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ISushi>('Sushi', sushiSchema);
