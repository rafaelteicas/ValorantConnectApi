export interface PayloadType {
  id?: number
  email: string
  username: string
  riotId: string
  profileImage?: string
}
export type TokenGenerator = (value: PayloadType) => string
export type RefreshTokenGenerator = () => string
