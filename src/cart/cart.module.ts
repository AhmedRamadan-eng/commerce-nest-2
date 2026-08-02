import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtService } from '@nestjs/jwt';
import { userModel } from 'src/db/user.db';
import { CartModel } from 'src/db/models/cart.model';
import { ProductModel } from 'src/db/models/products.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ProductModel, CartModel, userModel, AuthModule], 
  providers: [CartService, JwtService],
  controllers: [CartController],
})
export class CartModule {}