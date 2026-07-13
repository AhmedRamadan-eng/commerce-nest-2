import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user.db';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  logo: string;
@Prop({
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: User.name,
})
  createdBy: string;
}

export type CategoryDocument = HydratedDocument<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);
