import { type AddAccount } from '../../../data/useCases/addAccount'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class CreateUser implements Controller {
  private readonly addAccount: AddAccount
  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password, username, confirmPassword } = request.body

      const requiredFields = [
        'email',
        'password',
        'confirmPassword',
        'username'
      ]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          console.log('FALTA ', field)
          throw new Error('ERROR')
        }
      }

      await this.addAccount.add({
        email,
        password,
        username,
        confirmPassword
      })

      return response('success', 'Usuário criado com sucesso')
    } catch (err) {
      return {
        body: 'Server Error',
        status: 500
      }
    }
  }
}
