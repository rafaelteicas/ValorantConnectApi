import { type Router } from 'express'
import { GetAccountBy } from '../../presentation/controllers/user/getAccount'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { GetAccountById } from '../../data/useCases/user/getAccountById'
import { authMiddleware } from '../middlewares/authMiddleware'

export default (route: Router): void => {
  route.get('/user/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const account = new GetAccountById(UserRepository)
    const controller = new GetAccountBy(account)
    const response = await controller.handle(id)
    res.send(response.body)
    res.status(response.status)
  })
}
