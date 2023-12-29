import {type ConversationRepository} from '../../../infra/typeorm/repositories/conversation-repository';
import {type DbGetConversations} from '../../protocols/db-get-conversations';

export class DbGetConversationsUseCase implements DbGetConversations {
  constructor(
    private readonly conversationRepository: typeof ConversationRepository,
  ) {}

  async paths(userId: string): Promise<any> {
    const [items] = await this.conversationRepository.findAndCount({
      where: {user: {id: parseInt(userId)}},
    });
    if (!items) throw new Error('not found');
    return {
      posts: items,
    };
  }
}
