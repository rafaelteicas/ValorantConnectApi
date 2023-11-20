import { VerifyTokenJWT } from '../../../infra/jwt/utils/verifyToken'
import { VerifyTokenMiddleware } from '../../../presentation/middlewares/verifyTokenMiddleware'
import { type Middleware } from '../../../presentation/protocols/middleware'

export const makeVerifyToken = (): Middleware => {
  const checkToken = new VerifyTokenJWT()
  return new VerifyTokenMiddleware(checkToken)
}
