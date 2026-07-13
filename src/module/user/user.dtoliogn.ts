
import {IsString,IsNotEmpty,MinLength,MaxLength,IsEmail, IsNumber, Min, Max,IsOptional,IsPhoneNumber} from 'class-validator';

export class LoginDto {
 

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password cannot exceed 32 characters' })
  password: string;

 
}