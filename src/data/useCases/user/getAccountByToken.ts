import {type User} from '../../../infra/typeorm/entities/User';
import {type UserRepository} from '../../../infra/typeorm/repositories/userRepository';
import {type GetAccountBy} from '../../protocols/getAccountBy';

export class GetAccountByToken implements GetAccountBy {
  constructor(private readonly userRepository: typeof UserRepository) {}

  async get(token: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        token,
      },
    });
    return user;
  }
}
