import { type UserRepository } from "../../../infra/typeorm/repositories/userRepository";

export class LoadProfileImage { 
  constructor(
    private readonly userRepository: typeof UserRepository,
  ) { }
  
  async load(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if(!user) throw new Error('Usuário não encontrado!')
    return user.profile_image
  }
}