import {AddAccountUseCase} from '../../../../../data/use-cases/user/auth/add-account-use-case';
import {AuthUseCase} from '../../../../../data/use-cases/user/auth/auth-use-case';
import {GetByEmailUseCase} from '../../../../../data/use-cases/user/get-user/get-by-email-use-case';
import {UpdateTokenUseCase} from '../../../../../data/use-cases/user/token/update-token-use-case';
import {BcryptEncrypter} from '../../../../../infra/bcrypt/bcrypt';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {CreateUser} from '../../../../../presentation/controllers/user/auth/sign-up-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export function makeSignUp(): Controller {
  const bcrypt = new BcryptEncrypter();
  const updateToken = new UpdateTokenUseCase(UserRepository);
  const auth = new AuthUseCase(UserRepository, bcrypt, updateToken);
  const account = new AddAccountUseCase(UserRepository, bcrypt, auth);
  const getAccountByEmail = new GetByEmailUseCase(UserRepository);
  const controller = new CreateUser(account, getAccountByEmail);
  return controller;
}
