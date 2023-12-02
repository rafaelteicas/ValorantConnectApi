import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import { type RefreshTokenGenerator, type PayloadType, type TokenGenerator } from '../../../domain/token/tokenGenerator'

const privateKeyPath = path.join(process.cwd(), 'src', 'keys', 'privkey.key')
const privateKey = fs.readFileSync(privateKeyPath)

export const generateToken: TokenGenerator = (data: PayloadType): string => {
  return sign({ user: data }, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256'
  })
}

export const generateRefreshToken: RefreshTokenGenerator = (): string => {
  return sign({ }, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256'
  })
}
