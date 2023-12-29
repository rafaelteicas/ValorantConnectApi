export interface GetUserPathConversationUseCase {
  paths: (userId: string) => Promise<any>;
}
