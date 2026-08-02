import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { HCouponDocument } from 'src/db/models/Coupon.model';



@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<HCouponDocument>, 
  ) {}

  async create(dto: CreateCouponDto, adminId: string) {
    const cleanCode = dto.code.toUpperCase().trim(); // طده مش هياخد غير حروف ابر كيس 


    const existing = await this.couponModel.findOne({ code: cleanCode }); 
    if (existing) {
      throw new ConflictException('A coupon with this code already exists'); 
    }

    const newCoupon = new this.couponModel({
      ...dto,
      code: cleanCode,
      createdBy: adminId,
    });

    return await newCoupon.save();
  }

  async findAll() {
    return await this.couponModel.find().populate('createdBy', 'name email');
  }

  async findOne(id: string) { 
    const coupon = await this.couponModel.findById(id);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const updated = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('Coupon not found');
    }
    return updated;
  }

  async remove(id: string) { 
    const deleted = await this.couponModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Coupon not found');
    }
    return { message: 'Coupon deleted successfully' };
  }


async validateCoupon(code: string, userId: string) {
    const coupon = await this.couponModel.findOne({
      code: code.toUpperCase().trim(),
    });

    if (!coupon) throw new NotFoundException('Coupon Not Found.');

    if (new Date() > coupon.expiryDate)
      throw new BadRequestException('This coupon code has expired');

    if (coupon.usedCount >= coupon.maxUsage)
      throw new BadRequestException(
        'this coupon has reached its maximum global usage capacity',
      );

    
    const hasUsed = coupon.usedBy.map((id) => id.toString()).includes(userId);
    if (hasUsed) 
      throw new BadRequestException("You have already redeemed this coupon"); 

    return coupon; 





}}