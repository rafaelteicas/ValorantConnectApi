import { adapterExpressMiddleware } from '../adapter/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'

export const authMiddleware = adapterExpressMiddleware(makeAuthMiddleware())
