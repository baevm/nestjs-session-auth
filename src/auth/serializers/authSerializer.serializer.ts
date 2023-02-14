import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from 'src/user/user.model'
import { AuthService } from '../auth.service'

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super()
  }

  serializeUser(user: User, done: (err: Error, user: { id: string; role: string }) => void) {
    done(null, { id: user.id, role: user.role })
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error, user: Omit<User, 'password'>) => void
  ) {
    const user = await this.authService.findById(payload.id)
    done(null, user)
  }
}
