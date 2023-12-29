export interface DbGetConversations {
  paths: (userId: string) => Promise<any>;
}
