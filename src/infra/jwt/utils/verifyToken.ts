import { verify } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const publicKeyPath = path.join(process.cwd(), 'keys', 'pubkey.key')
const publicKey = fs.readFileSync(publicKeyPath)

export function verifyToken (token: string): any {
  return verify(token, publicKey, { algorithms: ['RS256'] }, (error, user) => {
    if (error) {
      throw new Error('unauthorized')
    }
    return user
  })
}
