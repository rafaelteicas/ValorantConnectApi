import { AddAccount } from '../../../data/useCases/user/addAccount'
import { GetAccountByEmail } from '../../../data/useCases/user/getAccountByEmail'
import { UpdateToken } from '../../../data/useCases/user/updateToken'
import { BcryptEncrypter } from '../../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { CreateUser } from '../../../presentation/controllers/user/signup'
import { type Controller } from '../../../presentation/protocols/controller'

export function makeSignUp (): Controller {
  const bcrypt = new BcryptEncrypter()
  const updateToken = new UpdateToken(UserRepository)
  const account = new AddAccount(UserRepository, bcrypt)
  const getAccountByEmail = new GetAccountByEmail(UserRepository)
  const controller = new CreateUser(account, getAccountByEmail, updateToken)
  return controller
}
