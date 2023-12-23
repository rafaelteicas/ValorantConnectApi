import { type User } from '../../infra/typeorm/entities/user-entity'

export interface GetAccountBy {
  get: (data: any) => Promise<User | null>
}
