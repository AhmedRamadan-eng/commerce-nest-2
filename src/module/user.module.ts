import { Module } from '@nestjs/common';


import { Usercontroller } from './user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema} from 'src/db/user.db';
import { addUserSchema } from './user/user.viledtion';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema:  UserSchema},
    ]),
  ],
  controllers: [Usercontroller],
  providers: [UserService],
    exports: [UserService],
  
})
export class UserModule {}