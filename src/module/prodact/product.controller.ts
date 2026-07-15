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

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { multerOptions } from 'src/common/enums/utils/multer.utls';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductService } from './product.service';
import { createProductDto } from './creat_prodact_dto';
import { UpdateproductDto } from './dto/update-brand.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly brandService: ProductService) {}

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
    @Body() dto: createProductDto,
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
    @Body() dto: UpdateproductDto,
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