import { type CheckToken, type TokenUseCase } from '../../../../domain/use-cases/token/token-use-case'
import { type UserRepository } from '../../../../infra/typeorm/repositories/user-repository'
import { type UpdateTokenUseCase } from './update-token-use-case'

export class ValidateRefreshTokenUseCase implements TokenUseCase {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly checkTokenJWT: CheckToken,
    private readonly updateToken: UpdateTokenUseCase
  ) { }

  async isValid (token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        refreshToken: token
      }
    })
    if (!user?.refreshToken) {
      return false
    }
    const result =  this.checkTokenJWT.check(user?.refreshToken)
    if (!result) {
      return false
    }
    return true
  }
}
