import { type TokenValidator } from '../../../../domain/token/tokenValidators'
import { response } from '../../../helpers/http'
import { RefreshToken } from '../refreshToken'

const makeTokenValidator = (): TokenValidator => {
  class TokenValidatorStub implements TokenValidator {
    validateRefreshToken (token: string): any {
      return 'ok'
    }
  }
  return new TokenValidatorStub()
}

interface SutTypes {
  sut: RefreshToken
  tokenValidatorStub: TokenValidator
}

const makeSut = (): SutTypes => {
  const tokenValidatorStub = makeTokenValidator()
  const sut = new RefreshToken(tokenValidatorStub)
  return {
    sut,
    tokenValidatorStub
  }
}

describe('Check Token', () => {
  it('should return unauthorized if token is null', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ authorization: '' })
    expect(httpResponse).toEqual(response('unauthorized'))
  })
  it('should return unauthorized if token is invalid', async () => {
    const { sut, tokenValidatorStub } = makeSut()
    jest.spyOn(tokenValidatorStub, 'validateRefreshToken').mockReturnValueOnce(false)
    const httpResponse = await sut.handle({ authorization: 'invalid_token' })
    expect(httpResponse).toEqual(response('unauthorized'))
  })
  it('should throw if validator throws', async () => {
    const { sut, tokenValidatorStub } = makeSut()
    jest.spyOn(tokenValidatorStub, 'validateRefreshToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ authorization: 'valid_token' })
    expect(httpResponse).toEqual(response('serverError'))
  })
  it('should return ok if token is valid', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ authorization: 'valid_token' })
    expect(httpResponse).toEqual(response('success'))
  })
})
