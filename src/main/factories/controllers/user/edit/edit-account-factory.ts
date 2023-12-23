import {EditAccountUseCase} from '../../../../../data/use-cases/user/edit/edit-account-use-case';
import {UniqueUseCaseImpl} from '../../../../../data/use-cases/user/edit/is-unique-use-case';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {EditAccount} from '../../../../../presentation/controllers/user/edit/edit-account-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeEditAccount = (): Controller => {
  const unique = new UniqueUseCaseImpl(UserRepository);
  const editAccount = new EditAccountUseCase(UserRepository);
  const controller = new EditAccount(editAccount, unique);
  return controller;
};
