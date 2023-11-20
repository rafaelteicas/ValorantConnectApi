import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeUploadProfileImage } from '../factories/upload/makeUploadProfileImage'
import { storage } from '../../infra/storage/multer'

export default function (route: Router): void {
  route.post('/profileImage/:id', storage.single('image'), adapterExpress(makeUploadProfileImage()))
}
