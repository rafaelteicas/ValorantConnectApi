import { type Controller } from '../../presentation/protocols/controller'
import { type Request, type Response, type NextFunction } from 'express'

export function adapterExpressMiddleware (controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse = await controller.handle(req.headers.authorization)
    if (httpResponse.status === 200) {
      next()
    } else {
      res.status(httpResponse.status).send('unauthorized')
    }
  }
}
