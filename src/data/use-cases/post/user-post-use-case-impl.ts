import {type PostModel} from '../../../domain/models/post/post-model';
import {type PostRepository} from '../../../infra/typeorm/repositories/post-repository';
import {type UserRepository} from '../../../infra/typeorm/repositories/user-repository';

export class UserPost {
  constructor(
    private readonly userRepository: typeof UserRepository,
    private readonly postRepository: typeof PostRepository,
  ) {}

  async createPost(post: PostModel, token: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        token,
      },
    });
    if (!user || !post) throw new Error();
    await this.postRepository.save({...post, date: new Date(), user});
  }
}
