import { type CheckToken } from '../../domain/token/checkToken'
import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class VerifyToken implements Controller {
  private readonly checkToken: CheckToken
  constructor (checkToken: CheckToken) {
    this.checkToken = checkToken
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.headers.authorization) {
      return {
        body: 'unauthorized',
        status: 401
      }
    }
    const isValid = this.checkToken.check(request.headers.authorization)
    if (!isValid) {
      return {
        body: 'unauthorized',
        status: 401
      }
    }
    return {
      body: 'Ok',
      status: 200
    }
  }
}
