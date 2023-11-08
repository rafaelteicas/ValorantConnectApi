import { type Encrypter } from '../../domain/encrypter'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { generateRefreshToken, generateToken } from '../../infra/jwt/utils/jwtGenerator'

export class Auth {
  private readonly userRepository: typeof UserRepository
  private readonly encrypter: Encrypter

  constructor (userRepository: typeof UserRepository, encrypter: Encrypter) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async auth (account: { email: string, password: string }): Promise< any | Error> {
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

    const token = generateToken(user.email)
    const refreshToken = generateRefreshToken(token)

    return {
      token,
      refreshToken
    }
  }
}
