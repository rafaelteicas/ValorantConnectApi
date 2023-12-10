import {type Router} from 'express';
import {adapterExpress} from '../adapter/express';
import {makeUserPost} from '../factories/post/makeUserPost';
import {makeGetUserPosts} from '../factories/post/makeGetUserPosts';
import {makeGetUser} from '../factories/user/makeGetUser';
import { makeGetUserById } from '../factories/user/makeGetUserById';

export default function (route: Router): void {
  route.post('/user/post', adapterExpress(makeUserPost()));
  route.get('/user', adapterExpress(makeGetUser()));
  route.get('/user/post', adapterExpress(makeGetUserPosts()));
  route.get('/user/:id', adapterExpress(makeGetUserById()))
}
