import { type UserPost } from '../../../data/useCases/post/userPost'
import { type PostType } from '../../../domain/post/postTypes'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class Post implements Controller {
  constructor (private readonly userPost: UserPost) {}
  async handle ({ body, params }: HttpRequest<PostType>): Promise<HttpResponse> {
    try {
      if (!body || !params) return response('missing')
      await this.userPost.createPost(body, params?.id)
      return response('success', 'Post adicionado com sucesso')
    } catch (error) {
      return response('serverError')
    }
  }
}
