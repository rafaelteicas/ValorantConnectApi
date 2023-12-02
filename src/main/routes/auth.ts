import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeAuthenticate } from '../factories/user/makeAuthenticate'
import { makeSignUp } from '../factories/user/makeSignUp'

export default function (route: Router): void {
  route.post('/auth', adapterExpress(makeAuthenticate()))
  route.post('/signup', adapterExpress(makeSignUp()))
}
