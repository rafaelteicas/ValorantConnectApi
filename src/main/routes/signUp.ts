import { type Router } from 'express'
import { BcryptEncrypter } from '../../infra/bcrypt/bcrypt'
import { AddAccount } from '../../data/useCases/addAccount'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { CreateUser } from '../../presentation/createUser'

export function signUp (route: Router): void {
  route.post('/signup', async (req, res) => {
    const bcrypt = new BcryptEncrypter()
    const addAccount = new AddAccount(UserRepository, bcrypt)
    const account = new CreateUser(addAccount)
    const response = await account.add(req.body)
    return res.send(response)
  })
}
