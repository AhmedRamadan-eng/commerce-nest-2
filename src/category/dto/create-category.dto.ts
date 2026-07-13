import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "category name is required" })
  @Length(2, 50, {
    message: "Category Name must be between 2 and 50 characters long",
  })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "logo is required" })
  logo!: string;
}
