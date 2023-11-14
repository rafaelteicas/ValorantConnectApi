import { type GetAccountById } from '../data/useCases/getAccountById'
import { type Controller } from './protocols/controller'
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
    const response = await this.getAccountById.get(request)

    return {
      body: response,
      status: 200
    }
  }
}
