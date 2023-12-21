import { type EditAccountInfo } from "../../../data/protocols/editAccountData";
import { type Unique } from "../../../domain/user/unique";
import { response } from "../../helpers/http";
import { type Controller } from "../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../protocols/http";

export class EditAccount implements Controller {
  constructor(
    private readonly editAccountInfo: EditAccountInfo,
    private readonly unique: Unique
  ) { }

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const authorization = request.authorization 
      if (!authorization) return response('unauthorized')
      const FORMATED_TOKEN = authorization.split(' ')[1];
      const { field, value } = request.body
      if (!field || !value) return response('missing')
      const isUnique = await this.unique.isUnique(value)
      if(!isUnique) return response('conflict')
      await this.editAccountInfo.edit(FORMATED_TOKEN, field, value)
      return response('success')
    } catch (e) {
      return response('serverError')
    } 
  }
}