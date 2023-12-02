export interface User {
  email: string
  username: string
  password: string
  confirmPassword: string
  riotId: string
}

export interface UserAccount {
  id: number
  email: string
  username: string
  password: string
  token: string
  riotId: string
  profileImage?: string
}

export interface AccountData {
  token: TokenResult
  user: Pick<UserAccount, 'id' | 'email' | 'username' | 'riotId' | 'profileImage' >
}

export interface TokenResult {
  token: {
    accessToken: string
    refreshToken: string
  }
}
