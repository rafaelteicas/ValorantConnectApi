import {type FirestoreServiceUseCase} from '../../../../domain/use-cases/database/firestore-service-use-case';
import {response} from '../../../helpers/http';
import {type Controller} from '../../../protocols/controller';
import {GetConversationController} from '../get-conversation-controller';

const makeFirestoreDatabaseStub = (): FirestoreServiceUseCase => {
  class FirestoreDatabaseStub implements FirestoreServiceUseCase {
    async read(pathId: string): Promise<any> {
      return await new Promise(resolve =>
        resolve({
          data: {
            data: {
              message: 'fake_msg',
              userId: 'fake_id',
            },
            path: {
              postId: 'fake_post_id',
              userId: 'fake_user_id',
              authorId: 'fake_autor_id',
            },
          },
        }),
      );
    }

    send: (data: any, pathId: string) => Promise<void>;
  }
  return new FirestoreDatabaseStub();
};

interface SutTypes {
  sut: Controller;
  firestoreDatabaseStub: FirestoreServiceUseCase;
}

const makeSut = (): SutTypes => {
  const firestoreDatabaseStub = makeFirestoreDatabaseStub();
  const sut = new GetConversationController(firestoreDatabaseStub);
  return {
    sut,
    firestoreDatabaseStub,
  };
};

describe('Get Conversation Controller', () => {
  it('should return badRequest if no path is provided', async () => {
    const {sut} = makeSut();
    const httpResponse = await sut.handle({
      query: '',
    });
    expect(httpResponse).toEqual(response('badRequest'));
  });
  it('should return notFound if no data is found', async () => {
    const {sut, firestoreDatabaseStub} = makeSut();
    jest
      .spyOn(firestoreDatabaseStub, 'read')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpResponse = await sut.handle({
      query: 'fake_path',
    });
    expect(httpResponse).toEqual(response('notFound'));
  });
  it('should return succes and data if the conversation is founded', async () => {
    const {sut, firestoreDatabaseStub} = makeSut();
    const httpResponse = await sut.handle({
      query: 'fake_path',
    });
    const data = await firestoreDatabaseStub.read('fake_path');
    expect(httpResponse).toEqual(response('success', data));
  });
});
