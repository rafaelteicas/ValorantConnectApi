import { GetAccountById } from '../../data/useCases/getAccountById'
import { UserRepository } from '../../infra/typeorm/repositories/userRepository'
import { type Controller } from '../../presentation/protocols/controller'
import { UploadProfileImage } from '../../presentation/controllers/upload/uploadProfileImage'
import { FirebaseStorageService } from '../../services/firebase/firebaseStorage'

export const makeUploadProfileImage = (): Controller => {
  const getById = new GetAccountById(UserRepository)
  const storage = new FirebaseStorageService()
  const controller = new UploadProfileImage(getById, UserRepository, storage)
  return controller
}
