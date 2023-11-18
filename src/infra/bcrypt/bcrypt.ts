import bcrypt from 'bcrypt'
import { type Encrypter } from '../../domain/encrypter/encrypter'

export class BcryptEncrypter implements Encrypter {
  async encrypt (password: string): Promise<string> {
    const SALT = 12
    return await bcrypt.hash(password, SALT)
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
