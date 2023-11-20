import { type User } from '../../../infra/typeorm/entities/User'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { type GetAccountBy } from '../../protocols/getAccountBy'

export class GetAccountById implements GetAccountBy {
  private readonly userRepository: typeof UserRepository

  constructor (userRepository: typeof UserRepository) {
    this.userRepository = userRepository
  }

  async get (id: string): Promise<User> {
    if (!id) throw new Error()
    const intId = parseInt(id)
    const user = await this.userRepository.findOneBy({ id: intId })
    if (!user) throw new Error('USER NOT FOUND')
    return user
  }
}
