import { type Router } from 'express'
import { GetAccountBy } from '../../presentation/getAccountBy'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { GetAccountById } from '../../data/useCases/getAccountById'
import { AuthMiddleware } from '../middlewares/authMiddleware'

export default (route: Router): void => {
  route.get('/user/:id', AuthMiddleware, async (req, res) => {
    const id = req.params.id
    const account = new GetAccountById(UserRepository)
    const controller = new GetAccountBy(account)
    const response = await controller.handle(id)
    res.send(response.body)
    res.status(response.status)
  })
}
