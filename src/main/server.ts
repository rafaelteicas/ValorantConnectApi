import { AppDataSource } from '../infra/typeorm/dataSource'
import { appConfig } from './config/app'

const app = appConfig()

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
