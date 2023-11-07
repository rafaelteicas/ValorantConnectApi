import express from 'express'
import bodyParser from 'body-parser'
import { AppDataSource } from '../infra/typeorm/dataSource'
import router from './routes'

const app = express()

app.use(bodyParser.json())

router(app)

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
