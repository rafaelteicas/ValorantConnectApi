import { type Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'
import { verifyToken } from '../../infra/jwt/utils/verifyToken'
import { generateRefreshToken, generateToken } from '../../infra/jwt/utils/jwtGenerator'

export default (route: Router): void => {
  route.get('/refresh-token', AuthMiddleware, (req, res) => {
    const refreshToken = req.headers.authorization?.split(' ')[1]
    if (!refreshToken) throw new Error('DEU RUIM')

    const verify = verifyToken(refreshToken)

    const newToken = generateToken(verify.user)
    const newRefreshToken = generateRefreshToken(verify.user)

    res.send({ token: newToken, refreshToken: newRefreshToken })
  })
}
