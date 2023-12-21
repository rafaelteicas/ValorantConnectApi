import { type EditAccountInfo } from "../../../data/protocols/editAccountData";
import { response } from "../../helpers/http";
import { type Controller } from "../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../protocols/http";

export class EditAccount implements Controller {
  constructor(
    private readonly editAccountInfo: EditAccountInfo
  ) {}

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    console.log(request.authorization);
    
    try {
      const authorization = request.authorization 
      if (!authorization) return response('unauthorized')
      const FORMATED_TOKEN = authorization.split(' ')[1];
      const { field, value } = request.body
      if(!field || !value) return response('missing')
      await this.editAccountInfo.edit(FORMATED_TOKEN, field, value)
      return response('success')
    } catch (e) {
      return response('serverError')
    } 
  }
}