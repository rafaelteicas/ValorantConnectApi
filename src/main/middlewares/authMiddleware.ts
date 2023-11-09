import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const publicKeyPath = path.join(process.cwd(), 'keys', 'pubkey.key')
const publicKey = fs.readFileSync(publicKeyPath)

export function AuthMiddleware (req: Request, res: Response, next: NextFunction): void {
  const headerToken = req.headers.authorization?.split(' ')[1]
  console.log(headerToken)

  if (headerToken == null) {
    throw new Error('unauthorized')
  }

  const decode = verify(headerToken, publicKey, { algorithms: ['RS256'] }, (error, user) => {
    if (error) {
      throw new Error('unauthorized')
    }
    return user
  })
  next()

  return decode
}
