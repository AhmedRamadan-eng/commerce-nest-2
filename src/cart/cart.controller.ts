import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/Add-to-cart-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
   console.log('req.user =', req.user);

  const userId = req.user.id;
  console.log('userId =', userId);
    return await this.cartService.getCart(userId);
  }

  @Post("addToCart")
  async addToCart(@Req() req: any, @Body() dto: AddCartDto) {
    const userId = req.user.id;
    return await this.cartService.addToCart(userId, dto);
  }

  @Patch('item/:productId')
  async removeItem(@Req() req: any, @Param('productId') productId: string) {
    const userId = req.user.id;
    return await this.cartService.removeItem(userId, productId);
  }
}