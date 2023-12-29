export interface FirestoreServiceUseCase {
  send: (data: any, pathId: string) => Promise<void>;
  read: (pathId: string) => Promise<any>;
}
