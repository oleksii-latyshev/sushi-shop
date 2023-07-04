import { Document } from 'mongoose';

export interface ISushiVariant {
  count: number;
  price: number;
  weight: number;
  img: string;
}

export interface ISushi extends Document {
  _id: string;
  name: string;
  category: number;
  rating: number;
  description: string;
  variants: ISushiVariant[];
}
