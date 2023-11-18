import { type Encrypter } from '../../domain/encrypter/encrypter'
import { type UserAccount, type User } from '../../domain/user/userTypes'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'

export class AddAccount {
  private readonly userRepository: typeof UserRepository
  private readonly encrypter: Encrypter

  constructor (
    userRepository: typeof UserRepository,
    encrypter: Encrypter
  ) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async add (account: User): Promise<UserAccount | Error> {
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
    return await this.userRepository.save({ ...account, password: hash })
  }
}
