import { adapterExpressMiddleware } from '../adapter/expressMiddleware'
import { makeAuthMiddleware } from '../factories/middleware/makeAuthMiddleware'

export const authMiddleware = adapterExpressMiddleware(makeAuthMiddleware())
