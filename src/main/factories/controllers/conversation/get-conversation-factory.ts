import {DbAddConversationUseCase} from '../../../../data/use-cases/conversation/db-add-conversation-use-case';
import {DbGetConversationsUseCase} from '../../../../data/use-cases/conversation/db-get-conversations-use-case';
import {ConversationRepository} from '../../../../infra/typeorm/repositories/conversation-repository';
import {UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {GetConversationController} from '../../../../presentation/controllers/conversation/get-conversation-controller';
import {GetUserConversationsController} from '../../../../presentation/controllers/conversation/get-user-conversations-controller';
import {AddConversationController} from '../../../../presentation/controllers/message/add-conversation-controller';
import {type Controller} from '../../../../presentation/protocols/controller';
import {FirebaseFirestoreDatabaseService} from '../../../../services/firebase/database/firebase-firestore-database';

export const makeGetConversation = (): Controller => {
  const firestoreService = new FirebaseFirestoreDatabaseService();
  const controller = new GetConversationController(firestoreService);
  return controller;
};

export const makeGetUserConversation = (): Controller => {
  const getUserPathConversation = new DbGetConversationsUseCase(
    ConversationRepository,
  );
  const controller = new GetUserConversationsController(
    getUserPathConversation,
  );
  return controller;
};

export const makeAddUserConversation = (): Controller => {
  const dbAddConversationUseCase = new DbAddConversationUseCase(
    ConversationRepository,
    UserRepository,
  );
  const controller = new AddConversationController(dbAddConversationUseCase);
  return controller;
};
