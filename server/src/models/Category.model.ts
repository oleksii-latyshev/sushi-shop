import { model, Schema } from 'mongoose';

import { ICategory } from '@/types/category.types';

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model<ICategory>('Category', categorySchema);
