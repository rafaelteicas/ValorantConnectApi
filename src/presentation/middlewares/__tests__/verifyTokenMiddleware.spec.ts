import { type CheckTokenResponse, type CheckToken } from '../../../domain/token/tokenValidators'
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
    const authorizationHeader: HttpRequest<any> = { body: '' }
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return unauthorized if token is invalid', async () => {
    const { sut, checkTokenStub } = makeSut()
    const authorizationHeader: HttpRequest<any> = {
      authorization: 'invalid_token'
    }
    jest.spyOn(checkTokenStub, 'check').mockReturnValueOnce(null)
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should throw if checkToken throws', async () => {
    const { sut, checkTokenStub } = makeSut()
    jest.spyOn(checkTokenStub, 'check').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({
      authorization: 'valid_token_user_id_2',
      params: { id: '2' }
    })
    expect(response).toEqual(responseHelper('serverError'))
  })
  it('should return success if token is valid', async () => {
    const { sut } = makeSut()
    const authorizationHeader: HttpRequest<any> = {
      authorization: 'valid_token'
    }
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('success'))
  })
})
