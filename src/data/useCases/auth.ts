import { sign } from 'jsonwebtoken'
import { type Encrypter } from '../../domain/encrypter'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'

export class Auth {
  private readonly userRepository: typeof UserRepository
  private readonly encrypter: Encrypter

  constructor (userRepository: typeof UserRepository, encrypter: Encrypter) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async auth (account: { email: string, password: string }): Promise<{ token: string, refreshToken: string } | Error> {
    const user = await this.userRepository.findOne({
      where: { email: account.email }
    })

    if (!user) {
      throw new Error('Usuario invalido')
    }

    const isValidPassword = await this.encrypter.compare(
      account.password,
      user.password
    )

    if (!isValidPassword) {
      throw new Error('Usuario invalido')
    }

    const token = sign({ id: user.id }, 'secret', {
      expiresIn: '1h'
    })

    const refreshToken = sign({ token }, 'secret', {
      expiresIn: '1h'
    })

    return {
      token,
      refreshToken
    }
  }
}
