import { type User } from '../../../infra/typeorm/entities/User'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { type GetAccountBy } from '../../protocols/getAccountBy'

export class GetAccountByEmail implements GetAccountBy {
  private readonly userRepository: typeof UserRepository

  constructor (userRepository: typeof UserRepository) {
    this.userRepository = userRepository
  }

  async get (email: string): Promise<User> {
    if (!email) throw new Error()
    const user = await this.userRepository.findOneBy({ email })
    if (!user) throw new Error('USER NOT FOUND')
    return user
  }
}
