import { IsEmail, IsString, Length } from 'class-validator'

export class UserLoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string

  @IsString({})
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string
}
