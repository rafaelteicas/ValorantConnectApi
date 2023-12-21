import { type EditAccountInfo } from "../../../../data/protocols/editAccountData"
import { response } from "../../../helpers/http"
import { EditAccount } from "../editAccount"

interface SutTypes {
  sut: EditAccount
  editAccountInfoStub: EditAccountInfo
}

const makeEditAccountInfoStub = (): EditAccountInfo => {
  class EditAccountInfoStub implements EditAccountInfo {
    async edit(accessToken: string, field: string, value: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new EditAccountInfoStub()
}

const makeSut = (): SutTypes => {
  const editAccountInfoStub = makeEditAccountInfoStub()
  const sut = new EditAccount(editAccountInfoStub)
  return {
    sut,
    editAccountInfoStub
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
