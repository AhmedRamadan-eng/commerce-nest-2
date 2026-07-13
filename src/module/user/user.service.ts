import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './user.dto';
import { User, UserDocument } from 'src/db/user.db';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async CreateUse(data: CreateUserDto) {
    const { email } = data;
  console.log(email);
    const existsuser = await this.userModel.findOne({ email });

    if (existsuser) {
      throw new ConflictException('User already exists');
    }

    const user = new this.userModel(data);

console.log(user);

await user.save();

    return {
      message: 'User added successfully',
      data: User,
    };
  }

  
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}



