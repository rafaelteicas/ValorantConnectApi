import { type User } from '../domain/user-types'
import { type Response } from '../domain/response'
import { type Encrypter } from '../domain/encrypter'

export class CreateUser {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (user: User): Promise<Response> {
    const { email, password, username, confirmPassword } = user
    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'username'
    ]
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new Error('ERROR!')
      }
    }

    const hash = this.encrypter.encrypt(user.password)

    return {
      body: 'Usuario criado com sucesso!',
      statusCode: 200
    }
  }
}
