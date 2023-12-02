import { type CheckToken, type TokenValidator } from '../../../domain/token/tokenValidators'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { type UpdateToken } from './updateToken'

export class Validator implements TokenValidator {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly checkTokenJWT: CheckToken,
    private readonly updateToken: UpdateToken
  ) { }

  async validateRefreshToken (token: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        refreshToken: token
      }
    })
    if (!user?.refreshToken) throw new Error('token null')
    const result = this.checkTokenJWT.check(user?.refreshToken)
    if (!result) throw new Error()
    await this.updateToken.update({
      id: user.id,
      email: user.email,
      profileImage: user.profile_image,
      username: user.username,
      riotId: user.riotId
    }, user)
    return result
  }
}
