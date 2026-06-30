import { Injectable } from '@nestjs/common';
import { createProductDto } from './ceeate_prodact_dto';


@Injectable()
export class ProductService {

  constructor() {}

  createProduct(data: createProductDto) {
    return {
      message: "add product data",
      data,
    };
  }
}