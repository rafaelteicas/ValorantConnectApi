import {EditAccountUseCase} from '../../../../../data/use-cases/user/edit/edit-account-use-case';
import {UniqueUseCaseImpl} from '../../../../../data/use-cases/user/edit/is-unique-use-case';
import { BcryptEncrypter } from '../../../../../infra/bcrypt/bcrypt';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {EditAccount} from '../../../../../presentation/controllers/user/edit/edit-account-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeEditAccount = (): Controller => {
  const bcrypt = new BcryptEncrypter();
  const unique = new UniqueUseCaseImpl(UserRepository);
  const editAccount = new EditAccountUseCase(UserRepository, bcrypt);
  const controller = new EditAccount(editAccount, unique);
  return controller;
};
