import { GetByIdUseCase } from '../../../data/use-cases/user/get-user/get-by-id-use-case'
import { CheckTokenJWT } from '../../../infra/jwt/utils/verify-token'
import { UserRepository } from '../../../infra/typeorm/repositories/user-repository'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { type Middleware } from '../../../presentation/protocols/middleware'

export const makeAuthMiddleware = (): Middleware => {
  const checkToken = new CheckTokenJWT()
  const getAccountById = new GetByIdUseCase(UserRepository)
  const verifyAuth = new AuthMiddleware(checkToken, getAccountById)
  return verifyAuth
}
