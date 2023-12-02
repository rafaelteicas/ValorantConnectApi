import { UpdateToken } from '../../../data/useCases/user/updateToken'
import { Validator } from '../../../data/useCases/user/validator'
import { CheckTokenJWT } from '../../../infra/jwt/utils/verifyToken'
import { UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { RefreshToken } from '../../../presentation/controllers/user/refreshToken'
import { type Controller } from '../../../presentation/protocols/controller'

export const makeRefreshToken = (): Controller => {
  const updateToken = new UpdateToken(UserRepository)
  const checkTokenJWT = new CheckTokenJWT()
  const validator = new Validator(UserRepository, checkTokenJWT, updateToken)
  const controller = new RefreshToken(validator)
  return controller
}
