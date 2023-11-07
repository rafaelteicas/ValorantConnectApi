import { type Router } from 'express'
import { signUp } from './signUp'
import { auth } from './auth'

export default (routes: Router): void => {
  signUp(routes)
  auth(routes)
}
