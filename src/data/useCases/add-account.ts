import { type UserAccount, type User } from '../../domain/user-types'
import { UserRepository } from '../../infra/typeorm/repositories/user-repository'

export class AddAccount {
  async add (account: User): Promise<UserAccount> {
    UserRepository.create()
  }
}
