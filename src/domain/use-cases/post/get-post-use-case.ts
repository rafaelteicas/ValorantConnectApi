import { type PostListModel } from "../../models/post/post-model";

export interface GetPostUseCase {
    getPosts: ({perPage, page}: PostListModel) => Promise<any>
}