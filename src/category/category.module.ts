// import { Module } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { CategoryController } from './category.controller';
// import { UserModule } from 'src/module/user.module';
// import { AuthModule } from 'src/auth/auth.module';
// import { JwtService } from '@nestjs/jwt';

// @Module({
//   imports: [AuthModule, UserModule,CategoryModule],
//   controllers: [CategoryController],
//   providers: [CategoryService,JwtService],
// })
// export class CategoryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/module/user.module';
import { Category, CategorySchema } from 'src/db/models/category.model';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}