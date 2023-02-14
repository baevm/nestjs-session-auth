import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}

  async createUser(email: string, username: string, password: string) {
    const user = await this.user.create({ email, password, username })

    return { id: user.id, email: user.email, username: user.username }
  }

  async getByEmail(email: string) {
    const user = await this.user.findOne({ where: { email } })

    return user
  }

  async getById(id: string) {
    const user = await this.user.findOne({ where: { id } })

    return user
  }
}
