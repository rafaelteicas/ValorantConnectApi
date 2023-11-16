import { type Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'
import { adapterExpress } from '../adapter/express'
import { makeAuthenticate } from '../factories/makeAuthenticate'

export default function (route: Router): void {
  route.get('/auth', AuthMiddleware, (req, res) => {
    res.send('OK')
  })
  route.post('/auth', adapterExpress(makeAuthenticate()))
}
