import { type GetAccountBy } from '../../../data/protocols/getAccountBy'
import { type CheckTokenResponse, type CheckToken } from '../../../domain/token/tokenValidators'
import { AuthMiddleware } from '../authMiddleware'
import { response as responseHelper } from '../../helpers/http'

const makeGetAccountByIdStub = (): GetAccountBy => {
  class GetAccountByIdStub implements GetAccountBy {
    async get (data: any): Promise<any> {
      return await new Promise(resolve => resolve({ id: 1 }))
    }
  }
  return new GetAccountByIdStub()
}

const makeCheckTokenStub = (): CheckToken => {
  class CheckTokenStub implements CheckToken {
    check (token: string): CheckTokenResponse | null {
      return {
        user: { email: 'any_mail@mail.com', id: 1 }
      }
    }
  }
  return new CheckTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  checkTokenStub: CheckToken
  getAccountByIdStub: GetAccountBy
}

const makeSut = (): SutTypes => {
  const getAccountByIdStub = makeGetAccountByIdStub()
  const checkTokenStub = makeCheckTokenStub()
  const sut = new AuthMiddleware(checkTokenStub, getAccountByIdStub)
  return {
    sut,
    checkTokenStub,
    getAccountByIdStub
  }
}

describe('Auth Middleware', () => {
  it('should return unauthorized if no token data or params are provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return unauthorized if invalid token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ authorization: 'invalid_token' })
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should return unauthorized if user token is not equal to user from request params', async () => {
    const { sut, checkTokenStub, getAccountByIdStub } = makeSut()
    jest.spyOn(checkTokenStub, 'check').mockReturnValueOnce({
      user: { email: 'any_mail@mail.com', id: 2 }
    })
    jest.spyOn(getAccountByIdStub, 'get').mockResolvedValueOnce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      new Promise((resolve) => resolve({ id: 1 }))
    )
    const response = await sut.handle({
      authorization: 'valid_token_user_id_2',
      params: { id: '1' }
    })
    expect(response).toEqual(responseHelper('unauthorized'))
  })
  it('should throw if checkTokenStub or getAccountByIdStub throws', async () => {
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
  it('should return success if user token is equal to user from request params', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      authorization: 'valid_token_user_id_2',
      params: { id: '2' }
    })
    expect(response).toEqual(responseHelper('success'))
  })
})
