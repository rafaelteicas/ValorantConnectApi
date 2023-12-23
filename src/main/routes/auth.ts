import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {makeAuthenticate} from '../factories/controllers/user/auth/authenticate-factory';
import {makeSignUp} from '../factories/controllers/user/auth/sign-up-factory';

export function auth(route: Router): void {
  route.post('/auth', adapterExpress(makeAuthenticate()));
  route.post('/signup', adapterExpress(makeSignUp()));
}
