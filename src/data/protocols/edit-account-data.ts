export interface EditAccountInfo {
   edit: (accessToken: string, field: string, value: string) => Promise<void> 
}