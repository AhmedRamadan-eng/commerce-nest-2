import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user/user.service';

import{customValidationPipe} from "../pipe/viledion.pipe"
import { error } from 'console';
import { addUserSchema } from './user/user.viledtion';
import { CreateUserDto } from '../category/dto/user.dto';
import { LoginDto } from '../category/dto/user.dtoliogn';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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


  @Get('all')
  async findAll() {
    return this.UserService.findAll();
  }

  @Get('byid/:id')
  async findById(@Param('id') id: string) {
    return this.UserService.findById(id);
  }
 @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: CreateUserDto,
  ) {
    return this.UserService.update(dto, id);
  }

  @Delete('delete/:id')
@UseGuards(JwtAuthGuard)
async delete(@Param('id') id: string) {
  return this.UserService.delete(id);
}
}









