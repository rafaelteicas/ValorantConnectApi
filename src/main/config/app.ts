import express, { type Express } from 'express'
import { routerGenerator } from './routes'
import bodyParser from 'body-parser'

export function appConfig (): Express {
  const app = express()
  app.use(bodyParser.json())
  routerGenerator(app).then(() => {}).catch(e => console.log(e))
  return app
}
