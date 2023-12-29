import {type GetUserPathConversationUseCase} from '../../../domain/use-cases/conversation/get-user-path-conversation-use-case';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class GetUserConversationsController implements Controller {
  constructor(
    private readonly getUserPathConversation: GetUserPathConversationUseCase,
  ) {}

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const {id} = request.params;
      if (!id) return response('notFound');
      const data = await this.getUserPathConversation.paths(id);
      if (!data) return response('notFound');
      return response('success', data);
    } catch (e) {
      console.log(e);

      return response('serverError');
    }
  }
}
