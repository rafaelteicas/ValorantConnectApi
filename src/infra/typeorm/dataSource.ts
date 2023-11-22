import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'senha',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '/entities/*.ts')],
  subscribers: []
})
