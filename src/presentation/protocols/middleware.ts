import { type HttpResponse } from './http'

export interface Middleware {
  handle: (request: any) => Promise<HttpResponse>
}
