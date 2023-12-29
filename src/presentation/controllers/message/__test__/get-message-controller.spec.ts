import {type MessagePathModel} from '../../../../domain/models/message/message-model';
import {type FirestoreServiceUseCase} from '../../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../../helpers/http';
import {type Controller} from '../../../protocols/controller';
import {type HttpRequest} from '../../../protocols/http';
import {GetMessageController} from '../get-message-controller';

const makeFirestoreServiceStub = (): FirestoreServiceUseCase => {
  class FirestoreServiceStub implements FirestoreServiceUseCase {
    async read(path: string): Promise<any> {
      return {
        message: 'Ola',
      };
    }

    send: (data: any) => Promise<void>;
  }
  return new FirestoreServiceStub();
};

interface SutTypes {
  sut: Controller;
  firestoreServiceStub: FirestoreServiceUseCase;
}

const makeSut = (): SutTypes => {
  const firestoreServiceStub = makeFirestoreServiceStub();
  const sut = new GetMessageController(firestoreServiceStub);
  return {
    sut,
    firestoreServiceStub,
  };
};

describe('Get Message Controller', () => {
  it('should return bad request if no query params data are provided', async () => {
    const {sut} = makeSut();
    const httpRequest: HttpRequest<any> = {};
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(response('badRequest'));
  });
  it('should return server error if realTimeService throws', async () => {
    const {sut, firestoreServiceStub} = makeSut();
    jest.spyOn(firestoreServiceStub, 'read').mockRejectedValueOnce(new Error());
    const httpRequest: HttpRequest<any> = {
      query: {
        postId: 1,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(response('serverError'));
  });
  it('should return success  if a correct query param is provided', async () => {
    const {sut} = makeSut();
    const httpRequest: HttpRequest<any> = {
      query: {
        postId: 1,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(response('success', {message: 'Ola'}));
  });
});
