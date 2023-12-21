import { LoadProfileImage } from '../../../data/useCases/user/loadProfileImage'
import { UserRepository } from '../../../infra/typeorm/repositories/userRepository'
import { GetProfileImage } from '../../../presentation/controllers/user/getProfileImage'
import { type Controller } from '../../../presentation/protocols/controller'


export const makeGetProfileImage = (): Controller => {
  const loadProfileImage= new LoadProfileImage(UserRepository)
  const controller = new GetProfileImage(loadProfileImage)
  return controller
}
