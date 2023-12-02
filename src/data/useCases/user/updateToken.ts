import { type PayloadType } from '../../../domain/token/tokenGenerator'
import { type TokenResult } from '../../../domain/user/userTypes'
import { generateRefreshToken, generateToken } from '../../../infra/jwt/utils/jwtGenerator'
import { type User } from '../../../infra/typeorm/entities/User'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'

export class UpdateToken {
  constructor (private readonly userRepository: typeof UserRepository) {}
  async update (data: PayloadType, user: User): Promise<TokenResult> {
    const token = generateToken({ ...data })
    const refreshToken = generateRefreshToken()
    user.token = token
    user.refreshToken = refreshToken
    await this.userRepository.save(user)
    return {
      token: {
        accessToken: token,
        refreshToken: token
      }
    }
  }
}
