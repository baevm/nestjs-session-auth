import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { UserLoginDto } from './dto/user-login.dto'
import { UserSignupDto } from './dto/user-signup.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(dto: UserLoginDto) {
    return 'This action returns'
  }

  async signup(dto: UserSignupDto) {
    const isExist = await this.userService.getByEmail(dto.email)

    if (isExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashedPass = await bcrypt.hash(dto.password, 10)

    return this.userService.createUser(dto.email, dto.username, hashedPass)
  }

  async logout() {
    return 'This action removes the'
  }

  async validateUser(data: { email: string; password: string }) {
    const user = await this.userService.getByEmail(data.email)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
    }

    return { id: user.id, email: user.email, username: user.username, role: user.role }
  }

  async findById(id: string) {
    const user = await this.userService.getById(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }
}
