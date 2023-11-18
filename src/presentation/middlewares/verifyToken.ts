import { type CheckToken } from '../../domain/token/checkToken'
import { response } from '../helpers/http'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middleware'

export class VerifyToken implements Middleware {
  private readonly checkToken: CheckToken
  constructor (checkToken: CheckToken) {
    this.checkToken = checkToken
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const isValid = this.checkToken.check(request.headers.authorization)
    if (!request.headers.authorization || !isValid) {
      return response('unauthorized')
    }
    return response('success')
  }
}
