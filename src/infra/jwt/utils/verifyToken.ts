import { verify } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import { type CheckToken } from '../../../domain/token/checkToken'

const publicKeyPath = path.join(process.cwd(), 'keys', 'pubkey.key')
const publicKey = fs.readFileSync(publicKeyPath)

export class VerifyTokenJWT implements CheckToken {
  check (token: string): boolean {
    verify(
      token,
      publicKey,
      { algorithms: ['RS256'] },
      (error, user) => {
        if (error) {
          throw new Error('unauthorized')
        }
        return user
      }
    )
    return true
  }
}
