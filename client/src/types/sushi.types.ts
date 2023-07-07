export interface ISushiVariant {
  count: number;
  price: number;
  weight: number;
  img: string;
}

export interface IReviewUser {
  _id: string;
  name: string;
}

export interface ISushiReview {
  userId: IReviewUser;
  text: string;
  rating: number;
}

export interface ISushi {
  _id: string;
  name: string;
  category: number;
  description: string;
  variants: ISushiVariant[];
  reviews: ISushiReview[];
}

export interface SushiCart extends Pick<ISushi, '_id' | 'name' | 'variants'> {
  variant: number;
  inCartCount: number;
}

export type ICreateSushiReview = Pick<ISushiReview, 'text' | 'rating'>;

export const isSushiFromServer = (sushi: unknown): sushi is ISushi => {
  return Array.isArray(sushi);
};

export const isSushiCart = (arg: unknown): arg is SushiCart => {
  if (arg && typeof arg === 'object') {
    return '_id' in arg;
  }
  return false;
};
