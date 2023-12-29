export interface DbAddConversation {
  add: (path: DbAddConversationPath) => Promise<void>;
}

export interface DbAddConversationPath {
  postId: string;
  authorId: string;
  userId: string;
}
