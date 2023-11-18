import { VerifyTokenJWT } from '../../infra/jwt/utils/verifyToken'
import { VerifyToken } from '../../presentation/middlewares/verifyToken'
import { type Controller } from '../../presentation/protocols/controller'

export const makeAuthMiddleware = (): Controller => {
  const checkToken = new VerifyTokenJWT()
  const verifyToken = new VerifyToken(checkToken)
  return verifyToken
}
