import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeUserPost } from '../factories/post/makeUserPost'
import { authMiddleware } from '../middlewares/authMiddleware'
import { makeGetUserPosts } from '../factories/post/makeGetUserPosts'

export default function (route: Router): void {
  route.post('/user/:id', authMiddleware, adapterExpress(makeUserPost()))
  route.get('/posts', adapterExpress(makeGetUserPosts()))
}
