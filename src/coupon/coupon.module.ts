import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { AuthModule } from 'src/auth/auth.module';

import { CouponModel } from 'src/db/models/Coupon.model';
import { userModel } from 'src/db/user.db';

@Module({
  imports: [
    AuthModule,
    userModel,
    CouponModel,
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}