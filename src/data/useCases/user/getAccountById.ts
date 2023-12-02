import {type User} from '../../../infra/typeorm/entities/User';
import {type UserRepository} from '../../../infra/typeorm/repositories/userRepository';
import {type GetAccountBy} from '../../protocols/getAccountBy';

export class GetAccountById implements GetAccountBy {
  constructor(private readonly userRepository: typeof UserRepository) {}

  async get(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  }
}
