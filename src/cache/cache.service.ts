import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    console.log('Redis Connected');
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(
    key: string,
    value: string,
    ttlInSecond = 300,
  ) {
    return this.client.set(
      key,
      value,
      'EX',
      ttlInSecond,
    );
  }

  async del(key: string) {
    return this.client.del(key);
  }

  async delByPattern(pattern: string) {
    const keys = await this.client.keys(pattern);

    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}