import path from 'path';
import 'reflect-metadata';
import {DataSource} from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isProd = (): any => {
  if (process.env.DATABASE_URL) {
    return {
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
    };
  }
  return {
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  };
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  synchronize: true,
  entities: [path.join(__dirname, '../entities/*.{js,ts}')],
  ...isProd(),
});
