import { PartialType } from '@nestjs/mapped-types';


import { createProductDto } from '../creat_prodact_dto';

export class UpdateproductDto extends PartialType(createProductDto) {}