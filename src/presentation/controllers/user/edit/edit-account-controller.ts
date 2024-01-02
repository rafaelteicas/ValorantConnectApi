import { type EditAccountInfo } from "../../../../data/protocols/edit-account-data";
import { type UniqueUseCase } from "../../../../domain/use-cases/user/unique-use-case";
import { response } from "../../../helpers/http";
import { type Controller } from "../../../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../../../protocols/http";

export class EditAccount implements Controller {
  constructor(
    private readonly editAccountInfo: EditAccountInfo,
    private readonly unique: UniqueUseCase
  ) { }

  async handle(request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const authorization = request.authorization 
      if (!authorization) return response('unauthorized')
      const FORMATED_TOKEN = authorization.split(' ')[1];
      const { field, value, confirmPassword } = request.body
      if (!field || !value) return response('missing')
      console.log(field);
      if (field === 'password') {
      await this.editAccountInfo.edit(
        FORMATED_TOKEN,
        field,
        value,
        confirmPassword,
      );
      }
      const isUnique = await this.unique.isUnique(value)
      if(!isUnique) return response('conflict')
      await this.editAccountInfo.edit(FORMATED_TOKEN, field, value)
      return response('success')
    } catch (e) {
      return response('serverError')
    } 
  }
}