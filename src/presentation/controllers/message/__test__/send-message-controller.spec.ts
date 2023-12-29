import {
  type MessagePathModel,
  type MessageModel,
} from '../../../../domain/models/message/message-model';
import {type FirestoreServiceUseCase} from '../../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../../helpers/http';
import {type Controller} from '../../../protocols/controller';
import {type HttpRequest} from '../../../protocols/http';
import {SendMessageController} from '../send-message-controller';

const fakeMessage: HttpRequest<MessageModel> = {
  body: {
    message: 'fake_message',
  },
};

const makeFirestoreServiceServiceStub = (): FirestoreServiceUseCase => {
  class FirestoreServiceStub implements FirestoreServiceUseCase {
    read: (path: MessagePathModel) => Promise<any>;
    async send(data: any): Promise<void> {}
  }
  return new FirestoreServiceStub();
};

interface SutTypes {
  sut: Controller;
  firestoreServiceStub: FirestoreServiceUseCase;
}

const makeSut = (): SutTypes => {
  const firestoreServiceStub = makeFirestoreServiceServiceStub();
  const sut = new SendMessageController(firestoreServiceStub);
  return {
    sut,
    firestoreServiceStub,
  };
};

describe('Send Message Controller', () => {
  it('should return response success on success', async () => {
    const {sut} = makeSut();
    const httpResponse = await sut.handle(fakeMessage);
    expect(httpResponse).toEqual(response('success'));
  });
  it('should return server error if service throws', async () => {
    const {sut, firestoreServiceStub} = makeSut();
    jest.spyOn(firestoreServiceStub, 'send').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(fakeMessage);
    expect(httpResponse).toEqual(response('serverError'));
  });
});
