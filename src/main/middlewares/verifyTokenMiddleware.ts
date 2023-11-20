import { adapterExpressMiddleware } from '../adapter/expressMiddleware'
import { makeVerifyToken } from '../factories/middleware/makeVerifyToken'

export const verifyTokenMiddleware = adapterExpressMiddleware(makeVerifyToken())
