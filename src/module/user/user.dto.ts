
import {IsString,IsNotEmpty,MinLength,MaxLength,IsEmail, IsNumber, Min, Max,IsOptional,IsPhoneNumber} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password cannot exceed 32 characters' })
  password: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @Min(18, { message: 'Age must be at least 18 years old' })
  @Max(100, { message: 'Age cannot be greater than 100' })
  age: number;

  @IsPhoneNumber('EG', { message: 'Invalid Egyptian phone number' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  @MaxLength(200, { message: 'Address cannot exceed 200 characters' })
  address?: string;
}