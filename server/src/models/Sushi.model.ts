import { Document, Schema, Model, model } from 'mongoose';

import { Sushi } from '../types/sushi.type';

export interface ISushiModel extends Sushi, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

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

const SushiModel: Model<ISushiModel> = model<ISushiModel>('Sushi', sushiSchema);

export default SushiModel;
