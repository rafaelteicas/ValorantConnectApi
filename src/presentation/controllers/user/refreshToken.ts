import { type TokenValidator } from '../../../domain/token/tokenValidators'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class RefreshToken implements Controller {
  constructor (
    private readonly validator: TokenValidator
  ) { }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const token = request.authorization
      if (!token) return response('unauthorized')
      const isValid = this.validator.validateRefreshToken(token)
      if (!isValid) return response('unauthorized')
      return response('success')
    } catch (err) {
      return response('serverError')
    }
  }
}
