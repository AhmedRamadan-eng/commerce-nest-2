import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand } from 'src/db/models/brand.model';
import { BrandSchema } from 'src/db/models/brand.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandController], 
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
