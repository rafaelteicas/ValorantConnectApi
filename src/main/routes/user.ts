import {type Router} from 'express';
import {adapterExpress} from '../adapter/express';
import {makeUserPost} from '../factories/post/makeUserPost';
import {makeGetUserPosts} from '../factories/post/makeGetUserPosts';
import {makeGetUser} from '../factories/user/makeGetUser';

export default function (route: Router): void {
  route.post('/user/post', adapterExpress(makeUserPost()));
  route.get('/user', adapterExpress(makeGetUser()));
  route.get('/user/posts', adapterExpress(makeGetUserPosts()));
}
