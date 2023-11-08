import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function AuthMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { PUBLIC_KEY } = process.env
  if (!PUBLIC_KEY) throw new Error()

  const headerToken = req.headers.authorization?.split(' ')[1]
  if (headerToken == null) {
    throw new Error('unauthorized')
  }

  const decode = verify(
    headerToken, PUBLIC_KEY, (error, user) => {
      if (error) {
        throw new Error('unauthorized')
      }
      return user
    }
  )

  return decode
}
