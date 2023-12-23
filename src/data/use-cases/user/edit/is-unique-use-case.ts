import { type UniqueUseCase } from "../../../../domain/use-cases/user/unique-use-case";
import { type UserRepository } from "../../../../infra/typeorm/repositories/user-repository";

export class UniqueUseCaseImpl implements UniqueUseCase {
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