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
} from '@nestjs/common';
import { BrandService } from './brand.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { multerOptions } from 'src/common/enums/utils/multer.utls';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBrandDto } from './dto/creat_brand.dto';
;
import { UpdatebrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('all')
  async findAll() {
    return this.brandService.findAll();
  }

  @Get('byid/:id')
  async findById(@Param('id') id: string) {
    return this.brandService.findById(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async create(
    @Body() dto: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const logoUrl = file?.path ?? '';
    const adminId = req.user.sub;

    return this.brandService.create(dto, logoUrl, adminId);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatebrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const logoUrl = file?.path ?? '';

    return this.brandService.update(dto, logoUrl, id);
  }

  @Delete('delete/:id')
@UseGuards(JwtAuthGuard)
async delete(@Param('id') id: string) {
  return this.brandService.delete(id);
}
}