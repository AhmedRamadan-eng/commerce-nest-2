import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';

export class AddCartDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'product ID is required' })
  productId!: string;

  @IsInt()
  @Min(1, { message: 'quantity must be at least 1.' })
  quantity!: number;
}