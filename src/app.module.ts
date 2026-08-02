import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserModule } from './module/user.module';
import { ProductModule } from './module/prodact/product.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { CouponModule } from './coupon/coupon.module';
import { CacheModule } from './cache/cache.module';


@Module({
  imports: [
   ConfigModule.forRoot({
  envFilePath: 'config/.env',
  isGlobal: true,
}),
    // MongooseModule.forRoot('mongodb://localhost:27017/Ecomars', {
    //   connectionFactory: (connection: Connection) => {
    //     connection.on('connected', () => console.log('database connected'));
    //     return connection;
    //   },
    // }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),

    UserModule,
    ProductModule,
    AuthModule,
    CategoryModule,
    BrandModule,
  
    CartModule,
  
    ReviewModule,
      CacheModule,
     CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}