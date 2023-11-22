import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeUploadProfileImage } from '../factories/upload/makeUploadProfileImage'
import { storage } from '../../infra/storage/multer'
import { authMiddleware } from '../middlewares/authMiddleware'

export default function (route: Router): void {
  route.post('/profileImage/:id', storage.single('image'), authMiddleware, adapterExpress(makeUploadProfileImage()))
}
