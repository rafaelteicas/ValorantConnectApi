import { type Encrypter } from '../../../domain/encrypter/encrypter'
import { type User, type AccountData } from '../../../domain/user/userTypes'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { type Auth } from './auth'

export class AddAccount {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly encrypter: Encrypter,
    private readonly auth: Auth
  ) {}

  async add (account: User): Promise<AccountData> {
    const hash = await this.encrypter.encrypt(account.password)
    const findByEmail = await this.userRepository.findOne({
      where: { email: account.email }
    })
    const findByUserName = await this.userRepository.findOne({
      where: { username: account.username }
    })
    if (findByEmail || findByUserName) {
      throw new Error('Usuario ja existe')
    }
    await this.userRepository.save({ ...account, password: hash })
    const authData = await this.auth.auth({
      email: account.email,
      password: account.password
    })
    return authData
  }
}
