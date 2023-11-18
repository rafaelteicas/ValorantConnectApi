import { Auth } from '../../data/useCases/auth'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { Login } from '../../presentation/login'
import { type Controller } from '../../presentation/protocols/controller'

export const makeAuthenticate = (): Controller => {
  const bcrypt = new BcryptEncrypter()
  const auth = new Auth(UserRepository, bcrypt)
  return new Login(auth)
}