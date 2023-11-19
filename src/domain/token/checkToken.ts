export interface CheckTokenResponse {
  user: { id: number, email: string }
}

export interface CheckToken {
  check: (data: string | number) => CheckTokenResponse | null
}
