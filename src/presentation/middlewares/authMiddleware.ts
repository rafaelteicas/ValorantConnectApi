import { type GetAccountBy } from '../../data/protocols/getAccountBy'
import { type CheckToken } from '../../domain/token/checkToken'
import { response } from '../helpers/http'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  private readonly checkToken: CheckToken
  private readonly getAccountBy: GetAccountBy

  constructor (checkToken: CheckToken, getAccountBy: GetAccountBy) {
    this.checkToken = checkToken
    this.getAccountBy = getAccountBy
  }

  async handle ({ authorization, params }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!authorization || !params) {
        return response('unauthorized')
      }
      const tokenData = this.checkToken.check(authorization)
      const account = await this.getAccountBy.get(parseInt(params.id))
      if (!tokenData || tokenData.user.id !== account.id) {
        return response('unauthorized')
      }
      return response('success')
    } catch (e) {
      return response('serverError')
    }
  }
}
