import {type User} from '../../../../infra/typeorm/entities/user-entity';
import {type UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {type GetAccountBy} from '../../../protocols/get-account-by';

export class GetByIdUseCase implements GetAccountBy {
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
