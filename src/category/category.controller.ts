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
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { multerOptions } from 'src/common/enums/utils/multer.utls';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get('byid/:id')
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const logoUrl = file?.path ?? '';
    const adminId = req.user.sub;

    return this.categoryService.create(dto, logoUrl, adminId);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const logoUrl = file?.path ?? '';

    return this.categoryService.update(dto, logoUrl, id);
  }

  @Delete('delete/:id')
@UseGuards(JwtAuthGuard)
async delete(@Param('id') id: string) {
  return this.categoryService.delete(id);
}
}