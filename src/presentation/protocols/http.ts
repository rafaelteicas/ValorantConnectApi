export type HttpRequest = any

export interface HttpResponse {
  body: HttpRequest
  status: number
}
