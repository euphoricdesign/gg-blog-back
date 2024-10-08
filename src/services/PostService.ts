import AppDataSource from "../config/data-source"
import PostRepository from "../repositories/PostRepository"
import { CustomError } from "../types/types"

export const getAllPostsService = async () => {
  try {
    const posts = PostRepository.find()

    if (posts) return posts
    else throw new CustomError("Posts not found", 404)
  } catch (error) {
    throw error
  }
}

export const getPostService = async (id: number) => {
    try {
        const post = PostRepository.findOneBy({id})
        if (post) return post
        else throw new CustomError("Post not found", 404)
    } catch (error) {
        throw error
    }
}

export const createPostService = async (post:any) => {
    try {
      const createdPost = PostRepository.create(post);
        const savedPost = await PostRepository.save(createdPost)
        return savedPost
        
    } catch (error) {
        throw error
    }
}

export const getLastPostService = async () => {
  try {
    // Usamos una consulta SQL nativa para obtener el último post
    const result = await AppDataSource.query(
      `SELECT * FROM post ORDER BY "createdAt" DESC LIMIT 1`
    );
    
    const lastPost = result[0]; // El resultado es un array, tomamos el primer elemento

    if (lastPost) return lastPost;
    else throw new CustomError("No posts found", 404);
  } catch (error) {
    throw error;
  }
}