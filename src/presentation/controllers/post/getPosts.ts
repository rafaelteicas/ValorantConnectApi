import { type GetPostList } from '../../../domain/post/getPostList'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class GetPosts implements Controller {
  constructor (private readonly userPostList: GetPostList) { }

  async handle (request: HttpRequest<void>): Promise<HttpResponse | any> {    
    try {
      const { page, perPage } = request.query
      const posts = await this.userPostList.getPosts({ page, perPage })
      return response('success', posts)
    } catch (error) {
      console.log(error);
      return response('serverError')
    }
  }
}
