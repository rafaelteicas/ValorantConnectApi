import { type PostRepository } from '../../../infra/typeorm/repositories/postRepository'

export class UserPostList {
  constructor (
    private readonly postRepository: typeof PostRepository
  ) {}

  async getPosts (): Promise<any> {
    return await this.postRepository.find()
  }
}
