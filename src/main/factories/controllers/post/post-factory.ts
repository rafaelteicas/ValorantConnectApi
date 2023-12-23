import {UserPost} from '../../../../data/use-cases/post/user-post-use-case-impl';
import {PostRepository} from '../../../../infra/typeorm/repositories/post-repository';
import {UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {PostController} from '../../../../presentation/controllers/post/post-controller';
import {type Controller} from '../../../../presentation/protocols/controller';

export const makeUserPost = (): Controller => {
  const userPost = new UserPost(UserRepository, PostRepository);
  return new PostController(userPost);
};
