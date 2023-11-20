import { GetAccountById } from '../../../data/useCases/user/getAccountById'
import { VerifyTokenJWT } from '../../../infra/jwt/utils/verifyToken'
import { UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { AuthMiddleware } from '../../../presentation/middlewares/authMiddleware'
import { type Middleware } from '../../../presentation/protocols/middleware'

export const makeAuthMiddleware = (): Middleware => {
  const checkToken = new VerifyTokenJWT()
  const getAccountById = new GetAccountById(UserRepository)
  const verifyAuth = new AuthMiddleware(checkToken, getAccountById)
  return verifyAuth
}
