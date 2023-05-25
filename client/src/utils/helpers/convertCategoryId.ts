import type { CategoryFromServer } from '../../types';

export const convertCategoryId = (sushi: CategoryFromServer) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = sushi;
  return { id: _id, ...rest };
};
