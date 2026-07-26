import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productId')
  async findByProduct(@Param('productId') productId: string) {
    console.log(productId);
console.log(productId.length);
    return this.reviewService.findByProduct(productId);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.reviewService.create(createReviewDto, userId);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateReview(
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    const userId = req.user.id;
    return this.reviewService.update(id, updateReviewDto, userId);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteReview(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.reviewService.delete(id, userId);
  }
}