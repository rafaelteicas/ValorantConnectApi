import { AddAccount } from '../../data/useCases/addAccount'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { CreateUser } from '../../presentation/controllers/createUser/createUser'
import { type Controller } from '../../presentation/protocols/controller'

export function makeSignUp (): Controller {
  const bcrypt = new BcryptEncrypter()
  const account = new AddAccount(UserRepository, bcrypt)
  const controller = new CreateUser(account)
  return controller
}
