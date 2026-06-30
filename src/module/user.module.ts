import { Module } from '@nestjs/common';


import { Usercontroller } from './user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [Usercontroller],
  providers: [UserService],
})
export class UserModule {}