import { type Express } from 'express'
import { user, auth, refreshToken, uploadProfileImage } from '../routes'



export async function routerGenerator (app: Express): Promise<void> {
  auth(app)
  refreshToken(app)
  uploadProfileImage(app)
  user(app)
}
