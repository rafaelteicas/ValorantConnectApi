import { type CheckToken } from '../../domain/token/checkToken'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middleware'

export class VerifyToken implements Middleware {
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
