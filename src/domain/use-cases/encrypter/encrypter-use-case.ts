export interface EncrypterUseCase {
  encrypt: (password: string) => Promise<string>
  compare: (data: string, encrypted: string) => Promise<boolean>
}
