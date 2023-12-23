import { verify } from 'jsonwebtoken'
import { type CheckToken } from '../../../domain/use-cases/token/token-use-case'
export class CheckTokenJWT implements CheckToken {
  check (token: string): any {
    const FORMATTED_TOKEN = token.split(' ')[1]
    return verify(
      FORMATTED_TOKEN,
      process.env.JWT_KEY || '',
      (error, user) => {
        if (error) throw new Error()
        return user
      }
    )
  }
}
