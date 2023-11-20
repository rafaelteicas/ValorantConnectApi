import { type HttpRequest, type HttpResponse } from './http'

export interface Controller {
  handle: (request: HttpRequest<any>) => Promise<HttpResponse>
}
