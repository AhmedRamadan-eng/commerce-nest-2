  import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
  import { CouponService } from './coupon.service';
  import { CreateCouponDto } from './dto/create-coupon.dto';
  import { UpdateCouponDto } from './dto/update-coupon.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

  @Controller('coupon')
@UseGuards(JwtAuthGuard) 
  export class CouponController {
    constructor(private readonly couponService: CouponService) {}

    @Post()
    create(@Body() dto: CreateCouponDto, @Req() req: any) {
    const adminId = req.user.id;
      return this.couponService.create(dto, adminId);
    }

    @Post('validate')
    validate(@Body('code') code: string, @Req() req: any) {
       const userId = req.user.id;  
      return this.couponService.validateCoupon(code, userId);
    }

    @Get()
    findAll() {
      return this.couponService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
      return this.couponService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.couponService.remove(id);
    }
  }