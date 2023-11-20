import { type CheckToken } from '../../domain/token/checkToken'
import { response } from '../helpers/http'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middleware'

export class VerifyTokenMiddleware implements Middleware {
  private readonly checkToken: CheckToken

  constructor (checkToken: CheckToken) {
    this.checkToken = checkToken
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.authorization) return response('unauthorized')
      const isValid = this.checkToken.check(request.authorization)
      if (!request || !isValid) {
        return response('unauthorized')
      }
      return response('success')
    } catch (error) {
      return response('serverError')
    }
  }
}
