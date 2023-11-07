import { type Router } from 'express'
import { signUp } from './signUp'

export default (routes: Router): void => {
  signUp(routes)
}
