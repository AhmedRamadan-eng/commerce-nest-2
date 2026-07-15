import { PartialType } from '@nestjs/mapped-types';

import { CreateBrandDto } from './creat_brand.dto';

export class UpdatebrandDto extends PartialType(CreateBrandDto) {}