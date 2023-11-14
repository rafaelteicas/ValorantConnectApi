import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const privateKeyPath = path.join(process.cwd(), 'keys', 'privkey.key')
const privateKey = fs.readFileSync(privateKeyPath)

const { JWT_TOKEN_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = process.env

export const generateToken = (data: any): string => {
  return sign({ user: data }, privateKey, {
    expiresIn: JWT_TOKEN_EXPIRES_IN || '30s',
    algorithm: 'RS256'
  })
}

export const generateRefreshToken = (data: any): string => {
  return sign({ data }, privateKey, {
    expiresIn: JWT_REFRESH_EXPIRES_IN || '2m',
    algorithm: 'RS256'
  })
}
