import { UserPostList } from '../../../data/useCases/post/userPostList'
import { PostRepository } from '../../../infra/typeorm/repositories/postRepository'
import { GetPosts } from '../../../presentation/controllers/post/getPosts'
import { type Controller } from '../../../presentation/protocols/controller'

export const makeGetUserPosts = (): Controller => {
  const userPostList = new UserPostList(PostRepository)
  return new GetPosts(userPostList)
}
