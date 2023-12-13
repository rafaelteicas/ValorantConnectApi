import { AppDataSource } from '../infra/typeorm/dataSource'
import { appConfig } from './config/app'

const app = appConfig()

const PORT = 5000

AppDataSource.initialize()
  .then(() => {
    console.log('CONNECTED')
  })
  .catch(e => {
    console.log(e);
    throw new Error('CONECTE COM O DOCKER')
  })

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running https://localhost:${PORT}`)
})
