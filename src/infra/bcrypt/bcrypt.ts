import bcrypt from 'bcrypt'
import { type EncrypterUseCase } from '../../domain/use-cases/encrypter/encrypter-use-case'

export class BcryptEncrypter implements EncrypterUseCase {
  async encrypt (password: string): Promise<string> {
    const SALT = 12
    return await bcrypt.hash(password, SALT)
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
