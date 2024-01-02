export interface EditAccountInfo {
  edit: (
    accessToken: string,
    field: string,
    value: string,
    confirmPassword?: string,
  ) => Promise<void>;
}