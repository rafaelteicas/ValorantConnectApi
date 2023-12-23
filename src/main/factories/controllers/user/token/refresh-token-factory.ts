import {UpdateTokenUseCase} from '../../../../../data/use-cases/user/token/update-token-use-case';
import {ValidateRefreshTokenUseCase} from '../../../../../data/use-cases/user/token/validate-refresh-token-use-case';
import {CheckTokenJWT} from '../../../../../infra/jwt/utils/verify-token';
import {UserRepository} from '../../../../../infra/typeorm/repositories/user-repository';
import {RefreshToken} from '../../../../../presentation/controllers/user/token/refresh-token-controller';
import {type Controller} from '../../../../../presentation/protocols/controller';

export const makeRefreshToken = (): Controller => {
  const updateToken = new UpdateTokenUseCase(UserRepository);
  const checkTokenJWT = new CheckTokenJWT();
  const validator = new ValidateRefreshTokenUseCase(
    UserRepository,
    checkTokenJWT,
    updateToken,
  );
  const controller = new RefreshToken(validator);
  return controller;
};
