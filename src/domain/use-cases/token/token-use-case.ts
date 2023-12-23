export interface TokenUseCase {
  isValid: (token: string) => Promise<boolean>
}

export interface CheckTokenResponse {
  user: { id: number, email: string }
}

export interface CheckToken {
  check: (token: string) => CheckTokenResponse | null
}
