import { CheckTokenJWT } from '../../../infra/jwt/utils/verify-token'
import { VerifyTokenMiddleware } from '../../../presentation/middlewares/verify-token-middleware'
import { type Middleware } from '../../../presentation/protocols/middleware'

export const makeVerifyToken = (): Middleware => {
  const checkToken = new CheckTokenJWT()
  return new VerifyTokenMiddleware(checkToken)
}
