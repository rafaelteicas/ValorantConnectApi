import {GetByIdUseCase} from '../../../../data/use-cases/user/get-user/get-by-id-use-case';
import {UserRepository} from '../../../../infra/typeorm/repositories/user-repository';
import {type Controller} from '../../../../presentation/protocols/controller';
import {UploadProfileImageController} from '../../../../presentation/controllers/upload/upload-profile-image-controller';
import {FirebaseStorageService} from '../../../../services/firebase/storage/firebase-storage';

export const makeUploadProfileImage = (): Controller => {
  const getById = new GetByIdUseCase(UserRepository);
  const storage = new FirebaseStorageService();
  const controller = new UploadProfileImageController(
    getById,
    UserRepository,
    storage,
  );

  return controller;
};
