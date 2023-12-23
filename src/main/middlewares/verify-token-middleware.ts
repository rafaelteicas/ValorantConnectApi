import { adapterExpressMiddleware } from '../adapter/express-middleware-adapter'
import { makeVerifyToken } from '../factories/middleware/verify-token-middleware-factory'

export const verifyTokenMiddleware = adapterExpressMiddleware(makeVerifyToken())
