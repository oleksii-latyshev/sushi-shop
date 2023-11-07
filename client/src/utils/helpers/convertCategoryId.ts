import { ICategoryResponse } from '@/types/response.types';

export const convertCategoryId = (sushi: ICategoryResponse) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = sushi;
  return { id: _id, ...rest };
};
