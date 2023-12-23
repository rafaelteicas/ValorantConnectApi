import { type UserRepository } from "../../../../infra/typeorm/repositories/user-repository";
import { type EditAccountInfo } from "../../../protocols/edit-account-data";

export class EditAccountUseCase implements EditAccountInfo {
  constructor(
    private readonly userRepository: typeof UserRepository
  ) {}

  async edit(accessToken: string, field: string, value: string): Promise<void> {
    const account = await this.userRepository.findOne({
      where: {
        token: accessToken
      }
    })
    if(field === 'id' || field === 'profileImage' || field === 'posts') throw new Error('unauthorized')
    if (!account) throw new Error('unauthorized')
    account[field] = value
    await this.userRepository.save(account)
  }
}