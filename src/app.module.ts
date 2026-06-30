import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserModule } from './module/user.module';
import { ProductModule } from './module/prodact/product.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.dev','env.dev'],
    isGlobal:true
  }),

//       MongooseModule.forRoot('mongodb://localhost:27017/Ecomars',{
//  connectionFactory: (connection: Connection) => {
//     connection.on('connected', () => console.log(' database connected '));
//     return connection;
//   },
// })

MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URL'),
  }),
  inject: [ConfigService],
})


  ,UserModule,ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}