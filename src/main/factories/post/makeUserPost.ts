import {UserPost} from '../../../data/useCases/post/userPost';
import {PostRepository} from '../../../infra/typeorm/repositories/postRepository';
import {UserRepository} from '../../../infra/typeorm/repositories/userRepository';
import {Post} from '../../../presentation/controllers/post/post';
import {type Controller} from '../../../presentation/protocols/controller';

export const makeUserPost = (): Controller => {
  const userPost = new UserPost(UserRepository, PostRepository);
  return new Post(userPost);
};
