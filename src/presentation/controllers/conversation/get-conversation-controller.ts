import {type FirestoreServiceUseCase} from '../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class GetConversationController implements Controller {
  constructor(
    private readonly firestoreServiceUseCase: FirestoreServiceUseCase,
  ) {}

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const {path} = request.query;
      if (!path) return response('badRequest');
      const result = await this.firestoreServiceUseCase.read(path);
      if (!result) return response('notFound');
      return response('success', result);
    } catch {
      return response('serverError');
    }
  }
}
