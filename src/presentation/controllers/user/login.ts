import { type Auth } from '../../../data/useCases/user/auth'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class Login implements Controller {
  private readonly auth: Auth
  constructor (auth: Auth) {
    this.auth = auth
  }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { email, password } = request.body
      const token = await this.auth.auth({ email, password })
      if(!token) return response('unauthorized')
      return response('success', token)
    } catch (e) {
      return response('serverError')
    }
  }
}
