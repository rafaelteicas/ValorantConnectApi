import {type GetByIdUseCase} from '../../../data/use-cases/user/get-user/get-by-id-use-case';
import {type UserRepository} from '../../../infra/typeorm/repositories/user-repository';
import {type Controller} from '../../protocols/controller';
import {type HttpRequest, type HttpResponse} from '../../protocols/http';
import {type StorageService} from '../../../domain/use-cases/storage/storage-service';
import {response} from '../../helpers/http';

export class UploadProfileImageController implements Controller {
  constructor(
    private readonly getAccountById: GetByIdUseCase,
    private readonly userRepository: typeof UserRepository,
    private readonly storage: StorageService,
  ) {}

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    const USER_ID = request.params?.id;
    try {
      if (!USER_ID) throw new Error();
      const user = await this.getAccountById.get(USER_ID);
      if (!user || !request.fileImage) throw new Error();
      const newUrl = await this.storage.uploadFile(
        request.fileImage.buffer,
        USER_ID,
        {contentType: request.fileImage.mimetype},
      );
      user.profile_image = newUrl;
      await this.userRepository.save(user);
      return response('success');
    } catch (er) {
      console.log(er);
      return response('serverError');
    }
  }
}
