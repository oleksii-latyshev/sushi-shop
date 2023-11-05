import { Model } from 'mongoose';

async function createInitialEntity<T, S>(Model: Model<T>, data: S): Promise<void> {
  await Model.collection.drop();

  if (data instanceof Array) {
    Promise.all(
      data.map(async (item) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...newItem } = item;

          const model = new Model(newItem);
          await model.save();
        } catch (error) {
          return;
        }
      })
    );
  }

  return;
}

export default createInitialEntity;
