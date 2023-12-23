import {type User} from '../../../../infra/typeorm/entities/user-entity';
import {type UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {type GetAccountBy} from '../../../protocols/get-account-by';

export class GetByTokenUseCase implements GetAccountBy {
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
