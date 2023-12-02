import { Auth } from '../../../data/useCases/user/auth'
import { UpdateToken } from '../../../data/useCases/user/updateToken'
import { BcryptEncrypter } from '../../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { Login } from '../../../presentation/controllers/user/login'
import { type Controller } from '../../../presentation/protocols/controller'

export const makeAuthenticate = (): Controller => {
  const updateToken = new UpdateToken(UserRepository)
  const bcrypt = new BcryptEncrypter()
  const auth = new Auth(UserRepository, bcrypt, updateToken)
  return new Login(auth)
}
