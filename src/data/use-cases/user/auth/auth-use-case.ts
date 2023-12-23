import { type EncrypterUseCase } from '../../../../domain/use-cases/encrypter/encrypter-use-case'
import { type UserRepository } from '../../../../infra/typeorm/repositories/user-repository'
import { type AccountData } from '../../../../domain/models/user/user-model'
import { type UpdateTokenUseCase } from '../token/update-token-use-case'

export class AuthUseCase {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly encrypter: EncrypterUseCase,
    private readonly updateToken: UpdateTokenUseCase
  ) { }

  async auth (account: { email: string, password: string }): Promise<AccountData> {
    const user = await this.userRepository.findOne({
      where: { email: account.email }
    })
    if (!user) {
      throw new Error('Usuário invalido')
    }    
    const isValidPassword = await this.encrypter.compare(
      account.password,
      user.password
    )
    if (!isValidPassword) {
      throw new Error('Usuário invalido')
    }
    const {token} = await this.updateToken.update({
      id: user.id,
      email: user.email,
      profileImage: user.profile_image,
      username: user.username,
      riotId: user.riotId
    }, user)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        riotId: user.riotId,
        profileImage: user.profile_image
      }
    }
  }
}
