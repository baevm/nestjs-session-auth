import { Body, Controller, Post, Req, Session as GetSession } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Session } from 'express-session'
import { AuthService } from './auth.service'
import { UserLoginDto } from './dto/user-login.dto'
import { UserSignupDto } from './dto/user-signup.dto'
import { LocalGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: UserSignupDto) {
    return this.authService.signup(dto)
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Req() req, @Body() dto: UserLoginDto) {
    return req.session
  }

  @Post('/logout')
  async logout(@Req() req) {
    req.logout()
    req.session.destroy()
    return { message: 'Logged out' }
  }
}
