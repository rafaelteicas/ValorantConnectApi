import {type ConversationRepository} from '../../../infra/typeorm/repositories/conversation-repository';
import {type UserRepository} from '../../../infra/typeorm/repositories/user-repository';
import {
  type DbAddConversationPath,
  type DbAddConversation,
} from '../../protocols/db-add-conversation';

export class DbAddConversationUseCase implements DbAddConversation {
  constructor(
    private readonly conversationRepository: typeof ConversationRepository,
    private readonly userRepository: typeof UserRepository,
  ) {}

  async add(path: DbAddConversationPath): Promise<void> {
    const finalPath = `${path.postId}${path.authorId}${path.userId}`;
    const conversation = await this.conversationRepository.findOne({
      where: {
        path: finalPath,
      },
    });
    if (!conversation) {
      const author = await this.userRepository.findOne({
        where: {
          id: parseInt(path.authorId),
        },
      });
      if (!author) throw new Error();
      await this.conversationRepository.save({
        path: finalPath,
        user: author,
        from: parseInt(path.userId),
      });
      const user = await this.userRepository.findOne({
        where: {
          id: parseInt(path.userId),
        },
      });
      if (!user) throw new Error();
      if (user.id === author.id) throw new Error();
      await this.conversationRepository.save({
        path: finalPath,
        user,
        from: parseInt(path.authorId),
      });
    }
  }
}
