import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  synchronize: true,
  entities: [path.join(__dirname, '/entities/*.{js,ts}')],
  // ssl: {
  //   rejectUnauthorized: true
  // },
  url: process.env.DATABASE_URL,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password:  process.env.DB_PASSWORD
})
