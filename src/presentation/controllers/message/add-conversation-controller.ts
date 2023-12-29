import {type DbAddConversation} from '../../../data/protocols/db-add-conversation';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class AddConversationController implements Controller {
  constructor(private readonly dbAddConversation: DbAddConversation) {}
  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const path = request.body;
      await this.dbAddConversation.add(path);
      return response('success');
    } catch (e) {
      console.log(e);

      return response('serverError');
    }
  }
}
