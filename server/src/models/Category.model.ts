import { Document, Schema, Model, model } from 'mongoose';
import { Category } from '../types/category.type';

export interface ICategoryModel extends Category, Document {
  _id: string;
}

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const CategoryModel: Model<ICategoryModel> = model<ICategoryModel>('Category', categorySchema);

export default CategoryModel;
