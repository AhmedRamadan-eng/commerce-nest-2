import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { createProductDto } from './creat_prodact_dto';
import { UpdateproductDto } from './dto/update-brand.dto';
import { Product } from 'src/db/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<Product>,
  ) {}

  async create(dto: createProductDto, logoUrl: string, adminId: string) {
    const productExists = await this.ProductModel.findOne({
      title: dto.title,
    });

    if (productExists) {
      throw new ConflictException('Product Already Exists');
    }

    
  const parsedSizes =
    typeof dto.sizes === 'string' ? JSON.parse(dto.sizes) : dto.sizes;

  const totalStock = parsedSizes.reduce(
    (sum: number, s: any) => sum + s.stock,
    0,
  );
    const newProduct = new this.ProductModel({
    title: dto.title,
    description: dto.description,
    price: dto.price,
    discount: dto.discount,
    category: dto.category,
    brand: dto.brand,
    colors: dto.colors,
    rating: dto.rating,
    isAvailable: dto.isAvailable,
    sizes: parsedSizes,   
    stock: totalStock,
    logo: logoUrl,
    createdBy: adminId,
  });


    return await newProduct.save();
  }

  async update(dto: UpdateproductDto, logoUrl: string | undefined, id: string) {
    const updateedpaylaod: any = { ...dto };

    if (logoUrl) {
      updateedpaylaod.logo = logoUrl;
    }

    
    if (dto.sizes) {
      updateedpaylaod.stock = dto.sizes.reduce(
        (sum: number, s: any) => sum + s.stock,
        0,
      );
    }

    const updated = await this.ProductModel.findByIdAndUpdate(
      id,
      updateedpaylaod,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Product not found');
    }

    return updated;
  }

  async findAll() {
    return await this.ProductModel.find().populate('createdBy category brand');
  }

  async findById(id: string) {
    const product = await this.ProductModel
      .findById(id)
      .populate('createdBy category brand');

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async delete(id: string) {
    const deleted = await this.ProductModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product deleted successfully',
      data: deleted,
    };
  }
}