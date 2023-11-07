import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'senha',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: []
})
