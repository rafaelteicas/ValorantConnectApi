import { type CheckToken } from '../../../domain/token/checkToken'
import { VerifyToken } from '../verifyToken'

const makeCheckTokenStub = (): CheckToken => {
  class CheckTokenStub implements CheckToken {
    check (token: string): boolean {
      return true
    }
  }
  return new CheckTokenStub()
}

interface SutTypes {
  sut: VerifyToken
  checkTokenStub: CheckToken
}

const makeSut = (): SutTypes => {
  const checkTokenStub = makeCheckTokenStub()
  const sut = new VerifyToken(checkTokenStub)
  return {
    sut,
    checkTokenStub
  }
}

describe('Verify Token Middleware', () => {
  it('should return unauthorized if token does not exists', async () => {
    const { sut } = makeSut()
    const request = {
      headers: { authorization: '' }
    }
    const response = await sut.handle(request)
    expect(response.body).toEqual('unauthorized')
    expect(response.status).toBe(401)
  })
  it('should return unauthorized if token is invalid', async () => {
    const { sut, checkTokenStub } = makeSut()
    jest.spyOn(checkTokenStub, 'check').mockReturnValueOnce(false)
    const request = {
      headers: { authorization: 'invalid_token' }
    }
    const response = await sut.handle(request)
    expect(response.body).toEqual('unauthorized')
    expect(response.status).toBe(401)
  })
  it('should return of if token is valid', async () => {
    const { sut } = makeSut()
    const request = {
      headers: { authorization: 'valid_token' }
    }
    const response = await sut.handle(request)
    expect(response.body).toEqual('Ok')
    expect(response.status).toBe(200)
  })
})
