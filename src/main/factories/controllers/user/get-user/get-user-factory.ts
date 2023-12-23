import {GetByTokenUseCase} from '../../../../../data/use-cases/user/get-user/get-by-token-use-case';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {GetAccountBy} from '../../../../../presentation/controllers/user/get-user/get-account-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeGetUser = (): Controller => {
  const getAccountByToken = new GetByTokenUseCase(UserRepository);
  const controller = new GetAccountBy(getAccountByToken);
  return controller;
};
