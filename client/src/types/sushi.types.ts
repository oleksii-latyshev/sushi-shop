export interface Sushi {
  id: string;
  name: string;
  price: number;
  counts: number[];
  weight: number;
  img: string;
  category: number;
  rating: number;
}

export interface SushiCart extends Pick<Sushi, 'id' | 'name' | 'price' | 'img' | 'category'> {
  count: number;
  inCartCount: number;
}

export type SushiFromServer = Omit<Sushi, 'id'> & { _id: string };

export interface ResponseSushi {
  sushi: SushiFromServer[];
  totalPages: number;
  currentPage: number;
}

export const isSushiFromServer = (sushi: unknown): sushi is SushiFromServer => {
  return Array.isArray(sushi);
};

// export const isSushiCart = (arg: unknown): arg is SushiCart => {
//   if (arg && typeof arg === 'object') {
//     return 'id' in arg && 'count' in arg;
//   }
//   return false;
// };
