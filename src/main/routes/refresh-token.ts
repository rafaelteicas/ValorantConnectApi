import { type Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'

export default (route: Router): void => {
  route.get('/refresh-token', AuthMiddleware, (req, res) => {
    res.send('TESTE')
  })
}
