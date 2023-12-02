export interface TokenValidator {
  validateRefreshToken: (token: string) => any
}

export interface CheckTokenResponse {
  user: { id: number, email: string }
}

export interface CheckToken {
  check: (token: string) => CheckTokenResponse | null
}
