import { type User } from '../../infra/typeorm/entities/User'

export interface GetAccountBy {
  get: (data: any) => Promise<User | null>
}
