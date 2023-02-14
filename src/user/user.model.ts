import { Column, Model, Table, DataType } from 'sequelize-typescript'

interface UserCreation {
  email: string
  password: string
  username: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreation> {
  @Column({
    type: DataType.UUIDV4,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'user' })
  role: string

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[]
}
