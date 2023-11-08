import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const privateKeyPath = path.join(process.cwd(), 'keys', 'privkey.key')
const privateKey = fs.readFileSync(privateKeyPath)

export const generateToken = (data: any): string => {
  return sign({ user: data }, privateKey, {
    expiresIn: '1h',
    algorithm: 'RS256'
  })
}

export const generateRefreshToken = (refreshToken: string): string => {
  return sign({ token: refreshToken }, privateKey, {
    expiresIn: '1h',
    algorithm: 'RS256'
  })
}
