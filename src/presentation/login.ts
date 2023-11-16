import { type Auth } from '../data/useCases/auth'
import { type Controller } from './protocols/controller'
import { type HttpRequest, type HttpResponse } from './protocols/http'

export class Login implements Controller {
  private readonly auth: Auth
  constructor (auth: Auth) {
    this.auth = auth
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request.body
      const token = await this.auth.auth({ email, password })

      return {
        body: token,
        status: 200
      }
    } catch (e) {
      return {
        body: e.message,
        status: 400
      }
    }
  }
}
