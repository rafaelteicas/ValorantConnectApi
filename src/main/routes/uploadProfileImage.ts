import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeUploadProfileImage } from '../factories/upload/makeUploadProfileImage'
import { storage } from '../../infra/storage/multer'
import { authMiddleware } from '../middlewares/authMiddleware'
import { makeGetProfileImage } from '../factories/upload/makeGetProfileImage'

export function uploadProfileImage (route: Router): void {
  route.post('/profileImage/:id', storage.single('image'), authMiddleware, adapterExpress(makeUploadProfileImage()))
  route.get('/profileImage/:id', authMiddleware, adapterExpress(makeGetProfileImage()))
}
