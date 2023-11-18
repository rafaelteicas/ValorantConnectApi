export interface VerifyToken {
  request: (token: string) => Promise<void>
}
