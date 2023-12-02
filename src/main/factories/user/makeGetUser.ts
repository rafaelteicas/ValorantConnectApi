import {GetAccountByToken} from '../../../data/useCases/user/getAccountByToken';
import {UserRepository} from '../../../infra/typeorm/repositories/userRepository';
import {GetAccountBy} from '../../../presentation/controllers/user/getAccount';
import {type Controller} from '../../../presentation/protocols/controller';

export const makeGetUser = (): Controller => {
  const getAccountByToken = new GetAccountByToken(UserRepository);
  const controller = new GetAccountBy(getAccountByToken);
  return controller;
};
