import { type GetAccountBy } from '../../../../data/protocols/get-account-by'
import { type AddAccountUseCase } from '../../../../data/use-cases/user/auth/add-account-use-case'
import { response } from '../../../helpers/http'
import { type Controller } from '../../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../../protocols/http'

export class CreateUser implements Controller {
  constructor (
    private readonly addAccount: AddAccountUseCase,
    private readonly getAccountBy: GetAccountBy,
  ) { }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { email, password, username, confirmPassword, riotId } = request.body
      const requiredFields = [
        'email',
        'password',
        'confirmPassword',
        'username',
        'riotId'
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
      const accountData = await this.addAccount.add({
        email,
        password,
        username,
        confirmPassword,
        riotId
      })
      return response('success', accountData)
    } catch (err) {
      console.log(err)
      return response('serverError')
    }
  }
}
