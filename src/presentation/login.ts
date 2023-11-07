import { type Auth } from '../data/useCases/auth'
import { type Controller } from './protocols/controller'
import { type HttpResponse } from './protocols/http'

export class Login implements Controller {
  private readonly auth: Auth
  constructor (auth: Auth) {
    this.auth = auth
  }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const { email, password } = request
      const token = await this.auth.auth({ email, password })

      return {
        body: token,
        status: 200
      }
    } catch (e) {
      return {
        body: 'DEU ERRO',
        status: 400
      }
    }
  }
}
