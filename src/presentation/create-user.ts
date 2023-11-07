import { type User } from '../domain/user-types'
import { type Response } from '../domain/response'

export class CreateUser {
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

    return {
      body: 'Usuario criado com sucesso!',
      statusCode: 200
    }
  }
}
