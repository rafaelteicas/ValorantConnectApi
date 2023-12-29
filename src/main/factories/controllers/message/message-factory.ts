import {DbAddConversationUseCase} from '../../../../data/use-cases/conversation/db-add-conversation-use-case';
import {ConversationRepository} from '../../../../infra/typeorm/repositories/conversation-repository';
import {UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {GetMessageController} from '../../../../presentation/controllers/message/get-message-controller';
import {SendMessageController} from '../../../../presentation/controllers/message/send-message-controller';
import {type Controller} from '../../../../presentation/protocols/controller';
import {FirebaseFirestoreDatabaseService} from '../../../../services/firebase/database/firebase-firestore-database';

export const makeSendMessageFactory = (): Controller => {
  const firestoreDatabase = new FirebaseFirestoreDatabaseService();
  const dbAddConversation = new DbAddConversationUseCase(
    ConversationRepository,
    UserRepository,
  );
  const controller = new SendMessageController(
    firestoreDatabase,
    dbAddConversation,
  );
  return controller;
};

export const makeGetMessageFactory = (): Controller => {
  const firestoreDatabase = new FirebaseFirestoreDatabaseService();
  const controller = new GetMessageController(firestoreDatabase);
  return controller;
};
