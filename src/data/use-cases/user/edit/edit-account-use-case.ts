import { type EncrypterUseCase } from "../../../../domain/use-cases/encrypter/encrypter-use-case";
import { type UserRepository } from "../../../../infra/typeorm/repositories/user-repository";
import { type EditAccountInfo } from "../../../protocols/edit-account-data";

export class EditAccountUseCase implements EditAccountInfo {
  constructor(
    private readonly userRepository: typeof UserRepository,
    private readonly encrypter: EncrypterUseCase,
  ) {}

  async edit(accessToken: string, field: string, value: string, confirmPassword?: string): Promise<void> {
    const account = await this.userRepository.findOne({
      where: {
        token: accessToken,
      },
    });
    if (field === 'id' || field === 'profileImage' || field === 'posts')
      throw new Error('unauthorized');
    if (field === 'password') {
      console.log(confirmPassword);
      
      if (confirmPassword !== value) return;
      if (!account) throw new Error('unauthorized');
      const newPassword = await this.encrypter.encrypt(value)
      account.password = newPassword;
      await this.userRepository.save(account);
    } else {
      if (!account) throw new Error('unauthorized');
      account[field] = value;
      await this.userRepository.save(account);
    }
  }
}