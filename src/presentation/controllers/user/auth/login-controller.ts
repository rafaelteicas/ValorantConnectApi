import {type AuthUseCase} from '../../../../data/use-cases/user/auth/auth-use-case';
import {response} from '../../../helpers/http';
import {type Controller} from '../../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../../protocols/http';

export class Login implements Controller {
  constructor(private readonly auth: AuthUseCase) {}

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const {email, password} = request.body;
      const token = await this.auth.auth({email, password});
      if (!token) return response('unauthorized');
      return response('success', token);
    } catch (e) {
      return response('serverError');
    }
  }
}
