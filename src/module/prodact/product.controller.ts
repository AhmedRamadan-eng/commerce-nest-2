import { BadRequestException, Body, Controller, ParseEnumPipe, Post, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './ceeate_prodact_dto';
import { customValidationPipe } from 'src/pipe/viledion.pipe';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  createProduct(
    @Body(new ValidationPipe()) createProductDto:createProductDto){
        // createProductDto.price
        // console.log(createProductDto.price);
        return this.productService.createProduct(createProductDto)
    }





}