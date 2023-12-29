export interface MessageModel {
  data: {
    message: string;
    userId: string;
  };
  path: MessagePathModel;
}

export interface MessagePathModel {
  postId: number;
  userId: number;
  authorId: number;
}
