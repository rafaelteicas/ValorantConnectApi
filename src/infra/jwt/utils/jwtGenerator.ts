import { sign } from 'jsonwebtoken'
import { type RefreshTokenGenerator, type PayloadType, type TokenGenerator } from '../../../domain/token/tokenGenerator'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken: TokenGenerator = (data: PayloadType): string => {
  return sign({ user: data }, process.env.JWT_KEY || '', {
    expiresIn: '7d',
  })
}

export const generateRefreshToken: RefreshTokenGenerator = (): string => {
  return sign({ }, process.env.JWT_KEY || '', {
    expiresIn: '7d',
  })
}
