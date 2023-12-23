import { type GetByIdUseCase } from "../../../../data/use-cases/user/get-user/get-by-id-use-case";
import { response } from "../../../helpers/http";
import { type Controller } from "../../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../../protocols/http";

export class GetAccountBy implements Controller {
  constructor(private readonly getAccountById: GetByIdUseCase) { }
  async handle(request: HttpRequest<any>): Promise<HttpResponse>{
    const { id } = request.params
    try {
    const user = await this.getAccountById.get(id)
    if (!user) return response('missing')
      return response('success', {
       username: user.username,
        riotId: user.riotId,
        profileImage: user.profile_image
      })
    } catch (er) {
      return response('serverError')
    }
  }
}