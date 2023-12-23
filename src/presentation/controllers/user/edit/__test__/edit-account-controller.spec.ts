import { type EditAccountInfo } from "../../../../../data/protocols/edit-account-data"
import { type UniqueUseCase } from "../../../../../domain/use-cases/user/unique-use-case"
import { response } from "../../../../helpers/http"
import { EditAccount } from "../edit-account-controller"

interface SutTypes {
  sut: EditAccount
  editAccountInfoStub: EditAccountInfo
  isUniqueStub: UniqueUseCase
}

const makeEditAccountInfoStub = (): EditAccountInfo => {
  class EditAccountInfoStub implements EditAccountInfo {
    async edit(accessToken: string, field: string, value: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new EditAccountInfoStub()
}

const makeIsUniqueStub = (): UniqueUseCase => {
  class IsUniqueStub implements UniqueUseCase {
    async isUnique(value: string): Promise<boolean> {
      return await new Promise(resolve=> resolve(true))
    }
  }
  return new IsUniqueStub()
}

const makeSut = (): SutTypes => {
  const isUniqueStub = makeIsUniqueStub()
  const editAccountInfoStub = makeEditAccountInfoStub()
  const sut = new EditAccount(editAccountInfoStub, isUniqueStub)
  return {
    sut,
    editAccountInfoStub,
    isUniqueStub
  }
}
describe('Edit Profile', () => {
  it('should return unauthorized if does not have a accessToken', async () => {
    const { sut } = makeSut()
    const request = {
      authorization: ''
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(response('unauthorized'))
  })
  it('should return unauthorized if invalid accessToken is provided', async () => {
    const { sut } = makeSut()
    const request = {
      authorization: 'invalid_token'
    }
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(response('unauthorized'))))
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(response('unauthorized'))
  })
  it('should return missing if no field or value is provided', async () => {
    const { sut } = makeSut()
    const request = {
      authorization: 'valid_token',
      body: {}
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(response('missing'))
  })
  it('should return conflict if the value is not unique', async () => {
    const { sut, isUniqueStub } = makeSut()
    jest.spyOn(isUniqueStub, 'isUnique').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const request = {
      authorization: 'valid_token',
      body: {
        field: 'any_field',
        value: 'already_exists_value'
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(response('conflict'))
  })
  it('should return success if valid fields are provided', async () => {
    const { sut } = makeSut()
    const request = {
      authorization: 'valid_token',
      body: {
        field: 'any_field',
        value: 'new_value'
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(response('success'))
  })
})
