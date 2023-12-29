import {type MessageModel} from '../../../domain/models/message/message-model';
import {type FirestoreServiceUseCase} from '../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class GetMessageController implements Controller {
  constructor(private readonly firestoreService: FirestoreServiceUseCase) {}
  async handle(request: HttpRequest<MessageModel>): Promise<HttpResponse> {
    try {
      if (!request.query) return response('badRequest');
      const {postId, authorId, userId} = request.query;
      const data = await this.firestoreService.read(
        `${postId}${authorId}${userId}`,
      );
      return response('success', data);
    } catch (err) {
      return response('serverError');
    }
  }
}
