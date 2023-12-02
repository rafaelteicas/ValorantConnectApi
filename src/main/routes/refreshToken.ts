import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeRefreshToken } from '../factories/user/makeRefreshToken'

export default function (route: Router): void {
  route.get('/refresh_token', adapterExpress(makeRefreshToken()))
}
