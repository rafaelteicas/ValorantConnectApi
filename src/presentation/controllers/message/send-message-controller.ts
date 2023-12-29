import {type DbAddConversation} from '../../../data/protocols/db-add-conversation';
import {type MessageModel} from '../../../domain/models/message/message-model';
import {type FirestoreServiceUseCase} from '../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class SendMessageController implements Controller {
  constructor(
    private readonly firestoreService: FirestoreServiceUseCase,
    private readonly dbAddConversation: DbAddConversation,
  ) {}

  async handle(request: HttpRequest<MessageModel>): Promise<HttpResponse> {
    if (!request.body) return response('missing');
    try {
      const {data, path} = request.body;
      const userId = path.userId.toString();
      const authorId = path.authorId.toString();
      const postId = path.postId.toString();
      await this.firestoreService.send(data, `${postId}${authorId}${userId}`);
      await this.dbAddConversation.add({
        postId,
        authorId,
        userId,
      });
      return response('success');
    } catch (e) {
      return response('serverError');
    }
  }
}
