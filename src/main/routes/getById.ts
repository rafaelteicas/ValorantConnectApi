import { type Router, type Request, type Response } from 'express'

export default (route: Router): void => {
  route.get('/user/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.send({ id })
  })
}
