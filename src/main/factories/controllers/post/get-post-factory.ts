import {UserPostList} from '../../../../data/use-cases/post/user-post-list-use-case-impl';
import {PostRepository} from '../../../../infra/typeorm/repositories/post-repository';
import {GetPostsController} from '../../../../presentation/controllers/post/get-posts-controller';
import {type Controller} from '../../../../presentation/protocols/controller';

export const makeGetUserPosts = (): Controller => {
  const userPostList = new UserPostList(PostRepository);
  return new GetPostsController(userPostList);
};
