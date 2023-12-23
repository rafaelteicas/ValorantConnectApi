import { type User } from '../../../../infra/typeorm/entities/user-entity'
import { type UserRepository } from '../../../../infra/typeorm/repositories/user-repository'
import { type GetAccountBy } from '../../../protocols/get-account-by'

export class GetByEmailUseCase implements GetAccountBy {
  private readonly userRepository: typeof UserRepository
  constructor (userRepository: typeof UserRepository) {
    this.userRepository = userRepository
  }

  async get (email: any): Promise<User | null> {
    if (!email) throw new Error()
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
