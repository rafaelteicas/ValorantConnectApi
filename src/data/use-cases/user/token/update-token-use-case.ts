import { type PayloadType } from '../../../../domain/models/token/tokenGenerator'
import { type TokenResult } from '../../../../domain/models/user/user-model'
import { generateRefreshToken, generateToken } from '../../../../infra/jwt/utils/jwt-generator'
import { type User } from '../../../../infra/typeorm/entities/user-entity'
import { type UserRepository } from '../../../../infra/typeorm/repositories/user-repository'

export class UpdateTokenUseCase {
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
