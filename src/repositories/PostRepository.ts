import AppDataSource from "../config/data-source";
import { Post } from "../entities/Post";

const PostRepository = AppDataSource.getRepository(Post)

export default PostRepository