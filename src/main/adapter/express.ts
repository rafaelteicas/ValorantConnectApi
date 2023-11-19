import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/protocols/controller'
import { type HttpResponse, type HttpRequest } from '../../presentation/protocols/http'

export function adapterExpress (controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: { id: req.params.id },
      fileImage: req.file
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.status).json(httpResponse.body)
  }
}
