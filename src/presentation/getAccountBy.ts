import { type GetAccountById } from '../data/useCases/getAccountById'
import { type Controller } from './protocols/controller'
import { type GetUser } from './protocols/getUser'
import { type HttpResponse } from './protocols/http'

export class GetAccountBy implements Controller {
  private readonly getAccountById: GetAccountById

  constructor (getAccountById: GetAccountById) {
    this.getAccountById = getAccountById
  }

  async handle (request: any): Promise<HttpResponse> {
    if (!request) {
      return { body: new Error(), status: 400 }
    }
    const accountData = await this.getAccountById.get(request)
    const response: GetUser = {
      email: accountData.email,
      username: accountData.username,
      profileImage: accountData.profile_image
    }
    return {
      body: response,
      status: 200
    }
  }
}
