import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {makeRefreshToken} from '../factories/controllers/user/token/refresh-token-factory';

export function refreshTokenRoute(route: Router): void {
  route.get('/refresh_token', adapterExpress(makeRefreshToken()));
}
