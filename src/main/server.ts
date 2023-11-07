import express from 'express'
import { AddAccount } from '../data/useCases/addAccount'
import { BcryptEncrypter } from '../infra/bcrypt/bcrypt'
import { UserRepository } from '../infra/typeorm/repositories/userRepository'
import bodyParser from 'body-parser'
import { AppDataSource } from '../infra/typeorm/dataSource'
import { CreateUser } from '../presentation/createUser'

const app = express()

app.use(bodyParser.json())

app.post('/signup', async (req, res) => {
  const bcrypt = new BcryptEncrypter()
  const addAccount = new AddAccount(UserRepository, bcrypt)
  const account = new CreateUser(addAccount)
  const response = await account.add(req.body)
  return res.send(response)
})

AppDataSource.initialize()
  .then(() => {
    console.log('DEU BOM')
  })
  .catch(() => {
    console.log('DEU RUIM')
  })

app.listen(3000, () => {
  console.log('Rodando na 3000')
})
