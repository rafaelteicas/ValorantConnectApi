import { type GetByIdResponse } from '../../domain/userTypes'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'

export class GetAccountById {
  private readonly userRepository: typeof UserRepository

  constructor (userRepository: typeof UserRepository) {
    this.userRepository = userRepository
  }

  async get (id: number): Promise<GetByIdResponse | Error> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new Error('USER NOT FOUND')
    return {
      email: user?.email,
      username: user.username
    }
  }
}
