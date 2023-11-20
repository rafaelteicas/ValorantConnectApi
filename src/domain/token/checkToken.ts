export interface CheckTokenResponse {
  user: { id: number, email: string }
}

export interface CheckToken {
  check: (token: string) => CheckTokenResponse | null
}
