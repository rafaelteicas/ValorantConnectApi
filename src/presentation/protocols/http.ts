export interface HttpRequest<T> {
  body?: T;
  params?: any;
  authorization?: string;
  fileImage?: Express.Multer.File;
  query?: any;
}

export interface HttpResponse {
  body: any;
  status: number;
}
