import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from '../user.db';

@Schema({ timestamps: true })
export class Coupon {
  @Prop({
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  })
  code!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 100,
  })
  discountPercentage!: number;

  @Prop({
    type: Date,
    required: true,
  })
  expiryDate!: Date;

  @Prop({
    type: Number,
    required: true,
    min: 1,

  })
  maxUsage!: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  usedBy!: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
 ref: User.name,
    required: true,
  })
  createdBy!: string;

@Prop({
  type: Number,
  default: 0,
})
usedCount!: number;

}
export const couponSchema = SchemaFactory.createForClass(Coupon);

export type HCouponDocument = HydratedDocument<Coupon>;
export const CouponModel = MongooseModule.forFeature([
  { name: Coupon.name, schema: couponSchema },
]);