import { type PostType } from '../../../domain/post/postTypes'
import { type PostRepository } from '../../../infra/typeorm/repositories/postRepository'
import { type UserRepository } from '../../../infra/typeorm/repositories/userRepository'

export class UserPost {
  constructor (private readonly userRepository: typeof UserRepository, private readonly postRepository: typeof PostRepository) { }

  async createPost (post: PostType, userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(userId) }
    })
    if (!user || !post) throw new Error()
    await this.postRepository.save({ ...post, user })
  }
}
