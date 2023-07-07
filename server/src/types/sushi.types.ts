import { Document } from 'mongoose';

export interface ISushiVariant {
  count: number;
  price: number;
  weight: number;
  img: string;
}

export interface ISushiReview {
  userId: string;
  text: string;
  rating: number;
}

export interface ISushi extends Document {
  _id: string;
  name: string;
  category: number;
  description: string;
  variants: ISushiVariant[];
  reviews: ISushiReview[];
}
