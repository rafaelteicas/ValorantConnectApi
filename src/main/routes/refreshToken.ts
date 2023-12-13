import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeRefreshToken } from '../factories/user/makeRefreshToken'

export function refreshToken (route: Router): void {
  route.get('/refresh_token', adapterExpress(makeRefreshToken()))
}
