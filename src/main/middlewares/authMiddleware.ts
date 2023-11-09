import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function AuthMiddleware (req: Request, res: Response, next: NextFunction): void {
  const headerToken = req.headers.authorization?.split(' ')[1]
  if (headerToken == null) {
    throw new Error('unauthorized')
  }

  const decode = verify(
    headerToken, 'any', (error, user) => {
      if (error) {
        throw new Error('unauthorized')
      }
      return user
    }
  )

  return decode
}
