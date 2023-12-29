import {AppDataSource} from '../config/typeorm-config';
import {Post} from '../entities/post-entity';

export const PostRepository = AppDataSource.getRepository(Post);
