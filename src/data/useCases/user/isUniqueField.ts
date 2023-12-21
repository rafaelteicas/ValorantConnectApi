import { type Unique } from "../../../domain/user/unique";
import { type UserRepository } from "../../../infra/typeorm/repositories/userRepository";

export class IsUniqueField implements Unique {
  constructor (private readonly userRepository: typeof UserRepository) {}
  async isUnique(value: string): Promise<boolean> {
    const result = await this.userRepository.findOne({
      where: {
        email: value,
        username: value
      }
    })
    if (result) return false
    return true
  }
}