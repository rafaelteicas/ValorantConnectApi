export interface UserModel {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  riotId: string;
}

export interface UserAccountModel {
  id: number;
  email: string;
  username: string;
  password: string;
  token: string;
  riotId: string;
  profileImage?: string;
}

export interface AccountData {
  token: TokenResult['token'];
  user: Pick<
    UserAccountModel,
    'id' | 'email' | 'username' | 'riotId' | 'profileImage'
  >;
}

export interface TokenResult {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
