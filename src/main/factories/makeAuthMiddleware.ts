import { VerifyTokenJWT } from '../../infra/jwt/utils/verifyToken'
import { VerifyToken } from '../../presentation/middlewares/verifyToken'
import { type Middleware } from '../../presentation/protocols/middleware'

export const makeAuthMiddleware = (): Middleware => {
  const checkToken = new VerifyTokenJWT()
  const verifyToken = new VerifyToken(checkToken)
  return verifyToken
}
