import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

import { JwtService } from '@nestjs/jwt';
import { ProductModel } from 'src/db/models/products.model';
import { ReviewModel } from 'src/db/models/review.model';
import { userModel } from 'src/db/user.db';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [userModel, ReviewModel, ProductModel],
  providers: [ReviewService, AuthModule, JwtService],
  controllers: [ReviewController],
})
export class ReviewModule {}