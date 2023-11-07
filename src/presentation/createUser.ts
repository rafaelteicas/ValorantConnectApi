import { type Response } from '../domain/response'
import { type AddAccount } from '../data/useCases/addAccount'

export class CreateUser {
  private readonly addAccount: AddAccount
  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async add (body: any): Promise<Response> {
    const { email, password, username, confirmPassword } = body

    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'username'
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        throw new Error('ERROR!')
      }
    }

    await this.addAccount.add({ email, password, username, confirmPassword })

    return {
      body: 'Usuario criado com sucesso!',
      statusCode: 200
    }
  }
}
