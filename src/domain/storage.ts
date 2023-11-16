export interface Storage {
  uploadFile: (
    file: Buffer,
    fileName: string,
    metadata?: any,
  ) => Promise<string | Error>
}
