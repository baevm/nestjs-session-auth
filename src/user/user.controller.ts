import { Controller, Get, Req, Session as GetSession, UseGuards } from '@nestjs/common'
import { LoggedInGuard } from 'src/auth/guards/isLoggedIn.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async getMe(@Req() request, @GetSession() session) {
    const id = session.passport.user.id
    const user = await this.userService.getById(id)

    return { id: user.id, email: user.email, username: user.username, role: user.role }
  }
}
