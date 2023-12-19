import {type PostRepository} from '../../../infra/typeorm/repositories/postRepository';

interface PostListParams {
  perPage: string;
  page: string;
}
export class UserPostList {
  constructor(private readonly postRepository: typeof PostRepository) {}

  async getPosts({perPage = '10', page = '1'}: PostListParams): Promise<any> {    
    const currentPage = parseInt(page);
    const [items, totalItems] = await this.postRepository.findAndCount({
      take: parseInt(perPage),
      skip: (currentPage - 1) * parseInt(perPage),
      loadRelationIds: true,
      order: {
        date: 'DESC'
      }
    });
    const totalPages = Math.ceil(totalItems / parseInt(perPage));
    const nextPage = hasNextPage(totalPages, currentPage);
    const previousPage = hasPreviousPage(totalPages, currentPage);
    
    return {
      meta: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems,
        nextPage,
        previousPage,
      },
      post: items
    };
  }
}

function hasNextPage(totalPages: number, currentPage: number): number | null {
  let nextPage;
  if (totalPages <= currentPage + 1) nextPage = null;
  if (totalPages > currentPage) nextPage = currentPage + 1;
  return nextPage;
}

function hasPreviousPage(
  totalPages: number,
  currentPage: number,
): number | null {
  let previousPage;
  if (totalPages <= currentPage + 1) previousPage = currentPage - 1;
  if (totalPages > currentPage || currentPage - 1 >= totalPages)
    previousPage = null;
  return previousPage;
}
