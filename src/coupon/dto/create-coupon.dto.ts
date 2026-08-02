import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty({ message: 'Coupon code is required' })
  code!: string;

  @IsInt()
  @Min(1, { message: 'Discount must be at least 1%' })
  @Max(100, { message: 'Discount cannot exceed 100%.' })
  @IsNotEmpty({ message: 'Discount percentage is required' })
  discountPercentage!: number;

  @IsDateString({}, { message: 'Expiry Date must be a valid ISO date string' })
  @IsNotEmpty({ message: 'Expiry date is required' })
  expiryDate!: number; 

  @IsInt()
  @Min(1, { message: 'Max usage must be at least 1' })
  @IsNotEmpty({ message: 'Max usage is required' })
  maxUsage!: number;
}