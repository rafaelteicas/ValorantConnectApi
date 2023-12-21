interface PostListParams {
  perPage: string,
  page: string
}

export interface GetPostList {
    getPosts: ({perPage, page}: PostListParams) => Promise<any>
}