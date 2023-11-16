export interface HttpRequest {
  body: any
  userId?: string
  fileImage?: Express.Multer.File
}

export interface HttpResponse {
  body: any
  status: number
}
