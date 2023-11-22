import { type PostRepository } from '../../../infra/typeorm/repositories/postRepository'

export class UserPostList {
  constructor (
    private readonly postRepository: typeof PostRepository
  ) {}

  async getPosts ({ perPage = 10, page = 1 }: { perPage: number, page: number }): Promise<any> {
    const [items, totalItems] = await this.postRepository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage
    })
    return {
      items,
      currentPage: page,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  }
}
