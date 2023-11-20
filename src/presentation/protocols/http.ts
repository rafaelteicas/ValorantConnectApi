export interface HttpRequest<T> {
  body?: T
  params?: {
    id: string
  }
  authorization?: string
  fileImage?: Express.Multer.File
  query?: any
}

export interface HttpResponse {
  body: any
  status: number
}
