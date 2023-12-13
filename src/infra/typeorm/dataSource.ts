import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false
  },
  entities: [path.join(__dirname, '/entities/*.{js,ts}')],
  url: process.env.DATABASE_URL,
  subscribers: []
})
