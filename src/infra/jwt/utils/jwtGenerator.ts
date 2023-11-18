import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import { type TokenGenerator } from '../../../domain/token/tokenGenerator'

const privateKeyPath = path.join(process.cwd(), 'keys', 'privkey.key')
const privateKey = fs.readFileSync(privateKeyPath)

// const { JWT_TOKEN_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = process.env

export const generateToken: TokenGenerator = (data: any): string => {
  return sign({ user: data }, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256'
  })
}

export const generateRefreshToken: TokenGenerator = (data: any): string => {
  return sign({ data }, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256'
  })
}
