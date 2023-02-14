import { Body, Controller, Get, Post, Req, Session as GetSession, UseGuards } from '@nestjs/common'
import { Session } from 'express-session'
import { LoggedInGuard } from 'src/auth/guards/isLoggedIn.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async getMe(@Req() request, @GetSession() session: Session) {
    console.log(session)
    // const id = session.passport.user.id
    // const user = await this.userService.getById(id)

    // return { id: user.id, email: user.email, username: user.username, role: user.role }
  }
}
