import {type Router} from 'express';
import {adapterExpress} from '../adapter/express';
import {makeUserPost} from '../factories/post/makeUserPost';
import {makeGetUserPosts} from '../factories/post/makeGetUserPosts';
import {makeGetUser} from '../factories/user/makeGetUser';
import { makeGetUserById } from '../factories/user/makeGetUserById';
import { makeEditAccount } from '../factories/user/makeEditAccount';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';

export function user (route: Router): void {
  route.post('/user/post', adapterExpress(makeUserPost()));
  route.get('/user', adapterExpress(makeGetUser()));
  route.patch('/user', verifyTokenMiddleware, adapterExpress(makeEditAccount()));
  route.get('/user/post', adapterExpress(makeGetUserPosts()));
  route.get('/user/:id', adapterExpress(makeGetUserById()))
}
