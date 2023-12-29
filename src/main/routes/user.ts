import {type Router} from 'express';
import {adapterExpress} from '../adapter/express-adapter';
import {makeUserPost} from '../factories/controllers/post/post-factory';
import {makeGetUserPosts} from '../factories/controllers/post/get-post-factory';
import {makeGetUser} from '../factories/controllers/user/get-user/get-user-factory';
import {makeGetUserById} from '../factories/controllers/user/get-user/get-user-by-id-factory';
import {makeEditAccount} from '../factories/controllers/user/edit/edit-account-factory';
import {verifyTokenMiddleware} from '../middlewares/verify-token-middleware';

export function userRoute(route: Router): void {
  route.post('/user/post', adapterExpress(makeUserPost()));
  route.get('/user', adapterExpress(makeGetUser()));
  route.patch(
    '/user',
    verifyTokenMiddleware,
    adapterExpress(makeEditAccount()),
  );
  route.get('/user/post', adapterExpress(makeGetUserPosts()));
  route.get('/user/:id', adapterExpress(makeGetUserById()));
}
