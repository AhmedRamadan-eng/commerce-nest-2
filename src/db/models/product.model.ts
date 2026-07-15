import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class SizeStock {
  @Prop({ type: String, required: true })
  size: string;

  @Prop({ type: Number, required: true, min: 0 })
  stock: number;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 100 })
  title: string;

  @Prop({ type: String, required: true, minlength: 10 })
  description: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, min: 0, max: 100, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  stock: number;

  @Prop({ type: [SizeStock], required: true })
  sizes: SizeStock[];

  @Prop({ type: [String], default: [] })
  colors: string[];

  @Prop({ type: String })
  logo: string;

  @Prop({ type: Number, min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ type: Boolean, default: true })
  isAvailable: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' })
  brand: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' })
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);