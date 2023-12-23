export interface StorageService {
  uploadFile: (
    file: Buffer,
    fileName: string,
    metadata?: any,
  ) => Promise<string>;
}
