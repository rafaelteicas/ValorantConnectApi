import { type GetAccountBy } from '../../../data/protocols/getAccountBy'
import { type AddAccount } from '../../../data/useCases/addAccount'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class CreateUser implements Controller {
  private readonly addAccount: AddAccount
  private readonly getAccountBy: GetAccountBy

  constructor (addAccount: AddAccount, getAccountBy: GetAccountBy) {
    this.addAccount = addAccount
    this.getAccountBy = getAccountBy
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
          return response('missing')
        }
      }
      const user = await this.getAccountBy.get(email)
      if (user != null) {
        return response('conflict')
      }
      await this.addAccount.add({
        email,
        password,
        username,
        confirmPassword
      })
      return response('success', 'Usuário criado com sucesso')
    } catch (err) {
      return response('serverError')
    }
  }
}
