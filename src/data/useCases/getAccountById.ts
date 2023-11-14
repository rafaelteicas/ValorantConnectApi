import { type User } from '../../infra/typeorm/entities/User'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'

export class GetAccountById {
  private readonly userRepository: typeof UserRepository

  constructor (userRepository: typeof UserRepository) {
    this.userRepository = userRepository
  }

  async get (id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new Error('USER NOT FOUND')
    return user
  }
}
