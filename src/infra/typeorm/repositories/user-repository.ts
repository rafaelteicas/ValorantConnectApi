import { AppDataSource } from '../../infra/typeorm/data-source'
import { User } from '../../infra/typeorm/entities/User'

export const UserRepository = AppDataSource.getRepository(User)
