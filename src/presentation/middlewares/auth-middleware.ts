import {type GetAccountBy} from '../../data/protocols/get-account-by';
import {type CheckToken} from '../../domain/use-cases/token/token-use-case';
import {response} from '../helpers/http';
import {type HttpRequest, type HttpResponse} from '../protocols/http';
import {type Middleware} from '../protocols/middleware';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly checkToken: CheckToken,
    private readonly getAccountBy: GetAccountBy
  ) { }

  async handle({
    authorization,
    params,
  }: HttpRequest<any>): Promise<HttpResponse> {
    try {
      if (!authorization || !params) {
        return response('unauthorized');
      }
      const tokenData = this.checkToken.check(authorization);
      const account = await this.getAccountBy.get(parseInt(params.id));
      if (!tokenData || tokenData.user.id !== account?.id) {
        return response('unauthorized');
      }
      return response('success');
    } catch (error) {
      return response('serverError');
    }
  }
}
