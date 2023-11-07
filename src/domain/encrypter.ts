export interface Encrypter {
  encrypt: (password: string) => Promise<string>
  compare: (data: string, encrypted: string) => Promise<boolean>
}
