import { adapterExpressMiddleware } from '../adapter/expressMiddleware'
import { makeAuthMiddleware } from '../factories/makeAuthMiddleware'

export const authMiddleware = adapterExpressMiddleware(makeAuthMiddleware())
