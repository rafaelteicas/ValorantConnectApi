import {LoadProfileImageUseCase} from '../../../../data/use-cases/user/edit/load-profile-image-use-case';
import {UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {GetProfileImage} from '../../../../presentation/controllers/user/get-user/get-profile-image-controller';
import {type Controller} from '../../../../presentation/protocols/controller';

export const makeGetProfileImage = (): Controller => {
  const loadProfileImage = new LoadProfileImageUseCase(UserRepository);
  const controller = new GetProfileImage(loadProfileImage);
  return controller;
};
