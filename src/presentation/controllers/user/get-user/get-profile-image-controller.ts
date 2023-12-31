import { type LoadProfileImageUseCase } from "../../../../data/use-cases/user/edit/load-profile-image-use-case";
import { response } from "../../../helpers/http";
import { type Controller } from "../../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../../protocols/http";

export class GetProfileImage implements Controller {
  constructor(
    private readonly loadProfileImage: LoadProfileImageUseCase
  ) { }

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const profileImage = await this.loadProfileImage.load(request.params.id)
      return { body: profileImage, status: 200 }
    } catch (e) {
      return response('serverError')
    }
  }
}