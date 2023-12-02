import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'mysecretpassword',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '/entities/*.ts')],
  subscribers: []
})
