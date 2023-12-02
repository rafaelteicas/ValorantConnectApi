import { verify } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import { type CheckToken } from '../../../domain/token/tokenValidators'

const publicKeyPath = path.join(process.cwd(), 'src', 'keys', 'pubkey.key')
const publicKey = fs.readFileSync(publicKeyPath)

export class CheckTokenJWT implements CheckToken {
  check (token: string): any {
    const FORMATTED_TOKEN = token.split(' ')[1]
    return verify(
      FORMATTED_TOKEN,
      publicKey,
      { algorithms: ['RS256'] },
      (error, user) => {
        if (error) throw new Error()
        return user
      }
    )
  }
}
