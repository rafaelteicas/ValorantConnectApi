import { AppDataSource } from '../dataSource'
import { Post } from '../entities/Post'

export const PostRepository = AppDataSource.getRepository(Post)
