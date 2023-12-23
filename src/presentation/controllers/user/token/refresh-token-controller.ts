import { type TokenUseCase } from '../../../../domain/use-cases/token/token-use-case'
import { response } from '../../../helpers/http'
import { type Controller } from '../../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../../protocols/http'

export class RefreshToken implements Controller {
  constructor (
    private readonly validator: TokenUseCase
  ) { }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const token = request.authorization
      if (!token) return response('unauthorized')
      const isValid = await this.validator.isValid(token)
      if (!isValid) return response('unauthorized')
      return response('success')
    } catch (err) {
      return response('serverError')
    }
  }
}
