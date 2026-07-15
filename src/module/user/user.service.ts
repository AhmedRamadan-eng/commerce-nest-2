import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../../category/dto/user.dto';
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
      data: user,
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(dto: CreateUserDto, id: string) {
    const ubdated = await this.userModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!ubdated)
      throw new NotFoundException('user doc not fond');

    return ubdated;
  }

  async findAll() {
    return this.userModel.find().populate('createdBy');
  }

  async findById(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('createdBy');

    if (!user)
      throw new NotFoundException('user not found');

    return user;
  }


  async delete(id: string) {
  const deleted = await this.userModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new NotFoundException('User not found');
  }

  return {
    message: 'User deleted successfully',
    data: deleted,
  };
}
}













