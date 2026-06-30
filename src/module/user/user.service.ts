import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

const users = [
  { id: 1, email: 'ahmed@gmail.com', name: 'Ahmed' },
  { id: 2, email: 'ali@gmail.com', name: 'Ali' },
];

@Injectable()
export class UserService {
  CreateUse(data: CreateUserDto) {
    const { email } = data;

    const user = users.find((user) => user.email === email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = {
      id: users.length + 1,
      ...data,
    };

    users.push(newUser);

    return {
      message: 'User added successfully',
      data: newUser,
    };
  }
}