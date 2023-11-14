import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '../../infra/jwt/utils/verifyToken'

export function AuthMiddleware (req: Request, res: Response, next: NextFunction): void {
  const headerToken = req.headers.authorization?.split(' ')[1]

  if (headerToken == null) {
    throw new Error('unauthorized')
  }

  verifyToken(headerToken)

  next()
}
