import { type Request, type Response, type NextFunction } from 'express'
import { type Middleware } from '../../presentation/protocols/middleware'

export function adapterExpressMiddleware (middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse = await middleware.handle(req.headers.authorization)
    if (httpResponse.status === 200) {
      next()
    } else {
      res.status(httpResponse.status).send('unauthorized')
    }
  }
}
