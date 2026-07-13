import { BadRequestException, Body, Controller, Get, ParseEnumPipe, Post, ValidationPipe } from '@nestjs/common';

import { UserService } from './user/user.service';

import{customValidationPipe} from "../pipe/viledion.pipe"
import { error } from 'console';
import { addUserSchema } from './user/user.viledtion';
import { CreateUserDto } from './user/user.dto';
import { LoginDto } from './user/user.dtoliogn';

@Controller("user")
export class Usercontroller {
  constructor(private readonly UserService: UserService) {}

//  @Post("add-user")
// // addUser(
// //   @Body( new customValidationPipe(addUserSchema.body)) data:  addUsreDTO,@Body( "gender",new ParseEnumPipe(["male", "female"], {
// //       errorHttpStatusCode: 405,

// //       exceptionFactory: (error) => {
// //         throw new BadRequestException({message: "gender must be male or female", extra: error, })
// //         ;}, 
// //       }),
// //   )
// //  gender:string,
// // ) {
// //  let user =   this.UserService.adduser(data);
// //   return user;
// // }}




@Post('CreateUser')
CreateUse(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  return this.UserService.CreateUse(createUserDto);
}


  

}








