import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  timestamps: true,
})
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 5,
  })
  rating!: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  comment!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

export const ReviewModel = MongooseModule.forFeature([
  {
    name: Review.name,
    schema: ReviewSchema,
  },
]);