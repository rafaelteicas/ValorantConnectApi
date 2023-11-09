import { AddAccount } from '../../data/useCases/addAccount'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { CreateUser } from '../../presentation/createUser'
import { type HttpResponse } from '../../presentation/protocols/http'

export async function makeSignUp (httpRequest): Promise<HttpResponse> {
  const bcrypt = new BcryptEncrypter()
  const account = new AddAccount(UserRepository, bcrypt)
  const controller = new CreateUser(account)
  return await controller.handle(httpRequest)
}
