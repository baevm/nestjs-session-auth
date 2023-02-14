import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthSerializer } from './serializers/authSerializer.serializer'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  imports: [PassportModule.register({ session: true }), UserModule],
})
export class AuthModule {}
