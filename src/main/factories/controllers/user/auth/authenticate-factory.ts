import {AuthUseCase} from '../../../../../data/use-cases/user/auth/auth-use-case';
import {UpdateTokenUseCase} from '../../../../../data/use-cases/user/token/update-token-use-case';
import {BcryptEncrypter} from '../../../../../infra/bcrypt/bcrypt';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {Login} from '../../../../../presentation/controllers/user/auth/login-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeAuthenticate = (): Controller => {
  const updateToken = new UpdateTokenUseCase(UserRepository);
  const bcrypt = new BcryptEncrypter();
  const auth = new AuthUseCase(UserRepository, bcrypt, updateToken);
  return new Login(auth);
};
