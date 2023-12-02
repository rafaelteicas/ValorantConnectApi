import { type GetAccountBy } from '../../../data/protocols/getAccountBy'
import { type AddAccount } from '../../../data/useCases/user/addAccount'
import { type UpdateToken } from '../../../data/useCases/user/updateToken'
import { response } from '../../helpers/http'
import { type Controller } from '../../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../../protocols/http'

export class CreateUser implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly getAccountBy: GetAccountBy,
    private readonly updateToken: UpdateToken
  ) { }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { email, password, username, confirmPassword, riotId } = request.body
      const requiredFields = [
        'email',
        'password',
        'confirmPassword',
        'username',
        'riotId'
      ]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response('missing')
        }
      }
      const user = await this.getAccountBy.get(email)
      if (user != null) {
        return response('conflict')
      }
      await this.addAccount.add({
        email,
        password,
        username,
        confirmPassword,
        riotId
      })
      const newUser = await this.getAccountBy.get(email)
      if (!newUser) throw new Error()
      const token = await this.updateToken.update({
        id: newUser?.id,
        email,
        riotId,
        username,
        profileImage: newUser?.profile_image
      }, newUser)
      return response('success', token)
    } catch (err) {
      console.log(err)
      return response('serverError')
    }
  }
}
