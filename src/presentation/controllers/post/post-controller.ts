import {type UserPost} from '../../../data/use-cases/post/user-post-use-case-impl';
import {type PostModel} from '../../../domain/models/post/post-model';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class PostController implements Controller {
  constructor(private readonly userPost: UserPost) {}
  async handle({
    body,
    authorization,
  }: HttpRequest<PostModel>): Promise<HttpResponse> {
    if (!body || !authorization) return response('missing');
    const requiredFields = ['main', 'elo', 'other'];
    for (const field of requiredFields) {
      if (!body[field]) return response('missing');
    }
    try {
      const FORMATED_TOKEN = authorization.split(' ')[1];
      await this.userPost.createPost({...body}, FORMATED_TOKEN);
      return response('success', 'Post adicionado com sucesso');
    } catch (error) {
      console.log(error);
      return response('serverError');
    }
  }
}
