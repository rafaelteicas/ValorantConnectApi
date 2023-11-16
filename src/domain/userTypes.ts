export interface User {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface UserAccount {
  id: number
  email: string
  username: string
  password: string
  token: string
}

export interface AccountData {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: Pick<UserAccount, 'id' | 'email' | 'username'>
}
