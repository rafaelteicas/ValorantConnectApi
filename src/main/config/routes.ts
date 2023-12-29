import {type Express} from 'express';
import {
  userRoute,
  authRoute,
  refreshTokenRoute,
  uploadProfileImageRoute,
  messageRoute,
  conversationRoute,
} from '../routes';

export async function routerGenerator(app: Express): Promise<void> {
  authRoute(app);
  refreshTokenRoute(app);
  uploadProfileImageRoute(app);
  userRoute(app);
  messageRoute(app);
  conversationRoute(app);
}
