import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';
import {type AccountData} from '../../../domain/user/userTypes';
import {type GetAccountByToken} from '../../../data/useCases/user/getAccountByToken';

export class GetAccountBy implements Controller {
  constructor(private readonly getAccountByToken: GetAccountByToken) {}
  async handle({authorization}: HttpRequest<any>): Promise<HttpResponse> {
    try {
      if (!authorization) return response('unauthorized');
      const FORMATED_TOKEN = authorization.split(' ')[1];
      const accountData = await this.getAccountByToken.get(FORMATED_TOKEN);
      if (!accountData) return response('unauthorized');
      const responseData: AccountData['user'] = {
        id: accountData.id,
        email: accountData.email,
        riotId: accountData.riotId,
        username: accountData.username,
        profileImage: accountData.profile_image,
      };
      return response('success', responseData);
    } catch (err) {
      console.log(err);
      return response('serverError');
    }
  }
}
