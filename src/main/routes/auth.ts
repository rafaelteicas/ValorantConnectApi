import { type Router } from 'express'
import { Auth } from '../../data/useCases/auth'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { Login } from '../../presentation/login'
import { AuthMiddleware } from '../middlewares/authMiddleware'

export default function (route: Router): void {
  route.get('/auth', AuthMiddleware, (req, res) => {
    res.send('OK')
  })
  route.post('/auth', async (req, res) => {
    const bcrypt = new BcryptEncrypter()
    const auth = new Auth(UserRepository, bcrypt)
    const controller = new Login(auth)
    const result = await controller.handle(req.body)
    res.status(result.status)
    res.send(result.body)
  })
}
