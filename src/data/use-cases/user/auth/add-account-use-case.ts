import { type EncrypterUseCase } from '../../../../domain/use-cases/encrypter/encrypter-use-case'
import { type UserModel, type AccountData } from '../../../../domain/models/user/user-model'
import { type UserRepository } from '../../../../infra/typeorm/repositories/user-repository'
import { type AuthUseCase } from './auth-use-case'

export class AddAccountUseCase {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly encrypter: EncrypterUseCase,
    private readonly auth: AuthUseCase
  ) {}

  async add (account: UserModel): Promise<AccountData> {
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
