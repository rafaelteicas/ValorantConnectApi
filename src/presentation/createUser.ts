import { type Response } from '../domain/response'
import { type AddAccount } from '../data/useCases/addAccount'

export class CreateUser {
  private readonly addAccount: AddAccount
  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async add (body: any): Promise<Response> {
    try {
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
    } catch (error) {
      return {
        body: 'DEU ERRO',
        statusCode: 500
      }
    }
  }
}
