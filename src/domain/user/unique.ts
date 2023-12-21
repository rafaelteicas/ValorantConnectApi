export interface Unique {
  isUnique: (value: string) => Promise<boolean>
}