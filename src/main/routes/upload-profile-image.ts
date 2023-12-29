import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {makeUploadProfileImage} from '../factories/controllers/upload/upload-profile-image-factory';
import {storage} from '../../infra/storage/multer';
import {authMiddleware} from '../middlewares/auth-middleware';
import {makeGetProfileImage} from '../factories/controllers/upload/upload-get-profile-image-factory';

export function uploadProfileImageRoute(route: Router): void {
  route.post(
    '/profileImage/:id',
    storage.single('image'),
    authMiddleware,
    adapterExpress(makeUploadProfileImage()),
  );
  route.get('/profileImage/:id', adapterExpress(makeGetProfileImage()));
}
