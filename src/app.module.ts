import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, RedisModule, UserModule],
  controllers: [],
})
export class AppModule {}
