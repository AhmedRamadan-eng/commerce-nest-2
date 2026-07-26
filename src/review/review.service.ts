import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateReviewDto } from './dto/create-review.dto';
import { Review} from './entities/review.entity';

import { Product, ProductDocument,  } from 'src/db/models/products.model';
import { ReviewDocument } from 'src/db/models/review.model';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,

    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateReviewDto, userId: string) {
    const productExists = await this.productModel.exists({
      _id: dto.product,
    });

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    const alreadyReviewed = await this.reviewModel.exists({
      product: dto.product,
      user: userId,
    });

    if (alreadyReviewed) {
      throw new ConflictException(
        'You have already reviewed this product',
      );
    }

    const newReview = new this.reviewModel({
      ...dto,
      user: userId,
    });

    return await newReview.save();
  }

  async update(reviewId: string, dto: UpdateReviewDto, userId: string) {
  const review = await this.reviewModel.findOne({
    _id: reviewId,
    user: userId,
  });
  if (!review)
    throw new NotFoundException(
      'Review not found or you are not authorized to update it',
    );

  if (dto.rating) review.rating = dto.rating;
  if (dto.comment) review.comment = dto.comment;

  return (await review.save()).populate('user', 'firstName lastName email');
}
async findByProduct(productId: string) {
  return this.reviewModel
    .find({ product: productId })
    .populate('user', 'firstName lastName email')
    .sort({ createdAt: -1 });
}

async delete(reviewId: string, userId: string) {
  const results = await this.reviewModel.deleteOne({
    _id: reviewId,
    user: userId,
  });
  if (results.deletedCount === 0) {
    throw new NotFoundException(
      'Review not found or you are not authorized to delete it',
    );
  }

  return { message: 'Review deleted successfully' };
}



}