import {type UserPost} from '../../../data/useCases/post/userPost';
import {type PostType} from '../../../domain/post/postTypes';
import {response} from '../../helpers/http';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';

export class Post implements Controller {
  constructor(private readonly userPost: UserPost) {}
  async handle({
    body,
    authorization,
  }: HttpRequest<PostType>): Promise<HttpResponse> {
    if (!body || !authorization) return response('missing');
    const requiredFields = ['main', 'elo', 'message'];
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
