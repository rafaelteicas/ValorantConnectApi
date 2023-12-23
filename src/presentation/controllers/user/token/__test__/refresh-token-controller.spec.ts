import { type TokenUseCase } from '../../../../../domain/use-cases/token/token-use-case'
import { response } from '../../../../helpers/http'
import { RefreshToken } from '../refresh-token-controller'

const makeTokenValidator = (): TokenUseCase => {
  class TokenValidatorStub implements TokenUseCase {
    isValid (token: string): any {
      return 'ok'
    }
  }
  return new TokenValidatorStub()
}

interface SutTypes {
  sut: RefreshToken
  tokenValidatorStub: TokenUseCase
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
    jest.spyOn(tokenValidatorStub, 'isValid').mockReturnValueOnce(new Promise(resolve=> resolve(false)))
    const httpResponse = await sut.handle({ authorization: 'invalid_token' })
    expect(httpResponse).toEqual(response('unauthorized'))
  })
  it('should throw if validator throws', async () => {
    const { sut, tokenValidatorStub } = makeSut()
    jest.spyOn(tokenValidatorStub, 'isValid').mockImplementationOnce(() => {
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
