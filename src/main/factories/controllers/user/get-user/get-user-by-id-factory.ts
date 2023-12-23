import {GetByIdUseCase} from '../../../../../data/use-cases/user/get-user/get-by-id-use-case';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {GetAccountBy} from '../../../../../presentation/controllers/user/get-user/get-account-by-id-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeGetUserById = (): Controller => {
  const getAccountById = new GetByIdUseCase(UserRepository);
  return new GetAccountBy(getAccountById);
};
