import { type Encrypter } from '../../domain/encrypter'
import { type UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { generateRefreshToken, generateToken } from '../../infra/jwt/utils/jwtGenerator'
import { type AccountData } from '../../domain/userTypes'

export class Auth {
  private readonly userRepository: typeof UserRepository
  private readonly encrypter: Encrypter

  constructor (userRepository: typeof UserRepository, encrypter: Encrypter) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async auth (account: { email: string, password: string }): Promise<AccountData | Error> {
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
    const accessToken = generateToken(user.email)
    const refreshToken = generateRefreshToken(user.email)
    user.token = accessToken
    await this.userRepository.save(user)
    return {
      token: {
        accessToken,
        refreshToken
      },
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }
  }
}
