import type { SushiFromServer } from '../../types/sushi.types';

export const convertSushiId = (sushi: SushiFromServer) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = sushi;
  return { id: _id, ...rest };
};
