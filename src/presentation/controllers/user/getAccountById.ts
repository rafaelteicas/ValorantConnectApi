import { type GetAccountById } from "../../../data/useCases/user/getAccountById";
import { response } from "../../helpers/http";
import { type Controller } from "../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../protocols/http";

export class GetAccountBy implements Controller {
  constructor(private readonly getAccountById: GetAccountById) { }
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