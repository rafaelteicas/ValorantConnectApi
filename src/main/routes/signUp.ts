import { type Router } from 'express'
import { makeSignUp } from '../factories/makeSignUp'
import { adapterExpress } from '../adapter/express'

export default function (route: Router): void {
  route.post('/signup', adapterExpress(makeSignUp()))
}
