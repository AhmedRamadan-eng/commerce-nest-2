import {
  IsArray,IsBoolean,IsNotEmpty,IsNumber,IsOptional,IsPositive,IsString,Max,MaxLength, Min,MinLength,} from 'class-validator';

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsNumber({}, { message: 'Price must be a number' })
@Min(0, { message: 'Price cannot be negative' })
price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount?: number;

@IsNumber({}, { message: 'Stock must be a number' })
@Min(0, { message: 'Stock cannot be negative' })
stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  brand: string;



  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes?: string[];

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}