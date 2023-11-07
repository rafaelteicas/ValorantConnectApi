import { type AddAccount } from '../data/useCases/addAccount'
import { type Controller } from './protocols/controller'
import { type HttpResponse } from './protocols/http'

export class CreateUser implements Controller {
  private readonly addAccount: AddAccount
  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle (account: any): Promise<HttpResponse> {
    try {
      const { email, password, username, confirmPassword } = account

      const requiredFields = [
        'email',
        'password',
        'confirmPassword',
        'username'
      ]
      for (const field of requiredFields) {
        if (!account[field]) {
          throw new Error('ERROR!')
        }
      }

      await this.addAccount.add({ email, password, username, confirmPassword })

      return {
        body: 'Usuario criado com sucesso!',
        status: 200
      }
    } catch (error) {
      console.log(error)
      return {
        body: 'DEU ERRO',
        status: 500
      }
    }
  }
}
