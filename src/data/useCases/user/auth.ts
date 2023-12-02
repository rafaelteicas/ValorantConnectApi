import { type Encrypter } from '../../../domain/encrypter/encrypter'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { type AccountData } from '../../../domain/user/userTypes'
import { type UpdateToken } from './updateToken'

export class Auth {
  constructor (
    private readonly userRepository: typeof UserRepository,
    private readonly encrypter: Encrypter,
    private readonly updateToken: UpdateToken
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
    const token = await this.updateToken.update({
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
