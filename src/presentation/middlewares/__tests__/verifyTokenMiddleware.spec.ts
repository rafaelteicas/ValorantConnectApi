import { type CheckTokenResponse, type CheckToken } from '../../../domain/token/checkToken'
import { VerifyTokenMiddleware } from '../verifyTokenMiddleware'
import { response as responseHelper } from '../../helpers/http'
import { type HttpRequest } from '../../protocols/http'

const makeCheckTokenStub = (): CheckToken => {
  class CheckTokenStub implements CheckToken {
    check (token: string): CheckTokenResponse {
      return {
        user: {
          email: 'any_mail@mail.com',
          id: 1
        }
      }
    }
  }
  return new CheckTokenStub()
}

interface SutTypes {
  sut: VerifyTokenMiddleware
  checkTokenStub: CheckToken
}

const makeSut = (): SutTypes => {
  const checkTokenStub = makeCheckTokenStub()
  const sut = new VerifyTokenMiddleware(checkTokenStub)
  return {
    sut,
    checkTokenStub
  }
}

describe('Verify Token Middleware', () => {
  it('should return unauthorized if token does not exists', async () => {
    const { sut } = makeSut()
    const authorizationHeader: HttpRequest = { body: '' }
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return unauthorized if token is invalid', async () => {
    const { sut, checkTokenStub } = makeSut()
    const authorizationHeader: HttpRequest = { authorization: 'invalid_token' }
    jest.spyOn(checkTokenStub, 'check').mockReturnValueOnce(null)
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return success if token is valid', async () => {
    const { sut } = makeSut()
    const authorizationHeader: HttpRequest = { authorization: 'valid_token' }
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('success'))
  })
})
