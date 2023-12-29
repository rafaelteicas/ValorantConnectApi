import {AppDataSource} from '../config/typeorm-config';
import {Conversation} from '../entities/conversation-entity';

export const ConversationRepository = AppDataSource.getRepository(Conversation);
