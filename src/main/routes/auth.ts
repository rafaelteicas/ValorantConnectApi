import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeAuthenticate } from '../factories/user/makeAuthenticate'

export default function (route: Router): void {
  route.post('/auth', adapterExpress(makeAuthenticate()))
}
