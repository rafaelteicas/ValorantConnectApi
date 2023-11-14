import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/protocols/controller'
import { type HttpResponse, type HttpRequest } from '../../presentation/protocols/http'

export function adapterExpress (controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      userId: req.params.id,
      profileImage: req.file?.filename
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.status).json(httpResponse.body)
  }
}
