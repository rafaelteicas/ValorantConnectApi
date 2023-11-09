import { type Router } from 'express'
import { makeSignUp } from '../factories/makeSignUp'

export default function (route: Router): void {
  route.post('/signup', async (req, res) => {
    const response = makeSignUp(req.body)
    return res.send(response)
  })
}
