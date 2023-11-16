import { type GetAccountById } from '../data/useCases/getAccountById'
import { type UserRepository } from '../infra/typeorm/repositories/userRepository'
import { type Controller } from './protocols/controller'
import { type HttpRequest, type HttpResponse } from './protocols/http'
import { type Storage } from '../domain/storage'

export class UploadProfileImage implements Controller {
  private readonly getAccountById: GetAccountById
  private readonly userRepository: typeof UserRepository
  private readonly storage: Storage

  constructor (
    getAccountById: GetAccountById,
    userRepository: typeof UserRepository,
    storage: Storage
  ) {
    this.userRepository = userRepository
    this.getAccountById = getAccountById
    this.storage = storage
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.userId) throw new Error()
      const user = await this.getAccountById.get(request.userId)
      if (!user || !request.fileImage) throw new Error()
      const newUrl = await this.storage.uploadFile(request.fileImage.buffer, request.userId, { contentType: request.fileImage.mimetype })
      if (typeof newUrl === 'string') {
        user.profile_image = newUrl
        await this.userRepository.save(user)
      }
      return {
        body: 'Deu bom',
        status: 200
      }
    } catch (er) {
      return {
        body: 'erro',
        status: 500
      }
    }
  }
}
