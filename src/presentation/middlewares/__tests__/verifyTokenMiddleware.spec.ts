import { type CheckToken } from '../../../domain/token/checkToken'
import { VerifyTokenMiddleware } from '../verifyTokenMiddleware'
import { response as responseHelper } from '../../helpers/http'

const makeCheckTokenStub = (): CheckToken => {
  class CheckTokenStub implements CheckToken {
    check (token: string): boolean {
      return true
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
    const authorizationHeader = ''
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return unauthorized if token is invalid', async () => {
    const { sut, checkTokenStub } = makeSut()
    jest.spyOn(checkTokenStub, 'check').mockReturnValueOnce(false)
    const authorizationHeader = 'invalid_token'
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return of if token is valid', async () => {
    const { sut } = makeSut()
    const authorizationHeader = 'valid_token'
    const response = await sut.handle(authorizationHeader)
    expect(response).toEqual(responseHelper('success'))
  })
})
