import { type Router } from 'express'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { AddAccount } from '../../data/useCases/addAccount'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { CreateUser } from '../../presentation/createUser'

export default function (route: Router): void {
  route.post('/signup', async (req, res) => {
    const bcrypt = new BcryptEncrypter()
    const addAccount = new AddAccount(UserRepository, bcrypt)
    const controller = new CreateUser(addAccount)
    const response = await controller.handle(req.body)
    return res.send(response)
  })
}
