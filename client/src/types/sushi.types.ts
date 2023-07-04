export interface ISushiVariant {
  count: number;
  price: number;
  weight: number;
  img: string;
}

export interface ISushi {
  _id: string;
  name: string;
  category: number;
  rating: number;
  description: string;
  variants: ISushiVariant[];
}

export interface SushiCart extends Pick<ISushi, '_id' | 'name' | 'variants'> {
  variant: number;
  inCartCount: number;
}

export interface ResponseSushi {
  sushi: ISushi[];
  totalPages: number;
  currentPage: number;
}

export const isSushiFromServer = (sushi: unknown): sushi is ISushi => {
  return Array.isArray(sushi);
};

// export const isSushiCart = (arg: unknown): arg is SushiCart => {
//   if (arg && typeof arg === 'object') {
//     return 'id' in arg && 'count' in arg;
//   }
//   return false;
// };
