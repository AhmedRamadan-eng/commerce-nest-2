import { NestFactory } from '@nestjs/core';

import { env } from "../config/env.service";
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port= env.port??3009
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
