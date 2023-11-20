import { type UserPostList } from '../../../data/useCases/post/userPostList'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class GetPosts implements Controller {
  constructor (private readonly userPostList: UserPostList) {}

  async handle (request: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const posts = await this.userPostList.getPosts()
      return response('success', posts)
    } catch (error) {
      return response('serverError')
    }
  }
}
