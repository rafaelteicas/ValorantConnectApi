import { type Router } from 'express'
import { adapterExpress } from '../adapter/express'
import { makeSignUp } from '../factories/user/makeSignUp'

export default function (route: Router): void {
  route.post('/signup', adapterExpress(makeSignUp()))
}
