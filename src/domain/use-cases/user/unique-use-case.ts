export interface UniqueUseCase {
  isUnique: (value: string) => Promise<boolean>
}