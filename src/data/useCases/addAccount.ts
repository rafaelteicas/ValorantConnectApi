import { type Encrypter } from '../../domain/encrypter'
import { type UserAccount, type User } from '../../domain/userTypes'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'

export class AddAccount {
  private readonly userRepository: typeof UserRepository
  private readonly encrypter: Encrypter

  constructor (userRepository: typeof UserRepository, encrypter: Encrypter) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async add (account: User): Promise<UserAccount> {
    const hash = await this.encrypter.encrypt(account.password)
    return await this.userRepository.save({ ...account, password: hash })
  }
}
