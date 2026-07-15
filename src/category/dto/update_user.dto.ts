import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from 'src/category/dto/user.dto';

export class UpdateuserDto extends PartialType(CreateUserDto) {}