import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../db/models/brand.model';
import { CreateBrandDto } from './dto/creat_brand.dto';
import { UpdatebrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly BrandModel: Model<Brand>,
  ) {}

  async create(
    dto: CreateBrandDto,
    logoUrl: string,
    adminId: string,
  ) {
    const BrandExists = await this.BrandModel.findOne({
      name: dto.name,
    });

    if (BrandExists) {
      throw new ConflictException('Brand Already Exists');
    }

    const newBrand = new this.BrandModel({
      ...dto,
      logo: logoUrl,
      createdBy: adminId,
    });

    return await newBrand.save();
  }

  async update(
    dto: UpdatebrandDto,
    logoUrl: string | undefined,
    id: string,
  ) {
    const updateedpaylaod: any = { ...dto };

    if (logoUrl) {
      updateedpaylaod.logo = logoUrl;
    }

    const updated = await this.BrandModel.findByIdAndUpdate(
      id,
      updateedpaylaod,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Brand not found');
    }

    return updated;
  }

  async findAll() {
    return await this.BrandModel.find().populate('createdBy');
  }

  async findById(id: string) {
    const brand = await this.BrandModel
      .findById(id)
      .populate('createdBy');

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async delete(id: string) {
    const deleted = await this.BrandModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Brand not found');
    }

    return {
      message: 'Brand deleted successfully',
      data: deleted,
    };
  }
}
