export interface HttpRequest {
  body?: any
  params?: {
    id: string
  }
  authorization?: string
  fileImage?: Express.Multer.File
}

export interface HttpResponse {
  body: any
  status: number
}
