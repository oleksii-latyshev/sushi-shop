import { Document } from 'mongoose';

export interface ISushi extends Document {
  name: string;
  description: string;
  price: number;
  counts: number[];
  weight: number;
  img: string;
  category: string;
  rating: number;
}
