import { model, Schema } from 'mongoose';

import { ISushi } from '@/types/sushi.types';

const sushiSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    counts: [
      {
        type: Number,
        required: true,
      },
    ],
    weight: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISushi>('Sushi', sushiSchema);
