import { ISushi } from '@/types/sushi.types';

export const convertSushiId = (sushi: ISushi) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = sushi;
  return { id: _id, ...rest };
};
