import { Request, Response } from "express"
import { createPostService, getAllPostsService, getLastPostService, getPostService } from "../services/PostService"
import { Post } from "../entities/Post"
import { io } from "../index"
import UserRepository from "../repositories/UserRepository"

export const getAllPosts = async (req: Request, res: Response) => {
    const posts: Post[] = await getAllPostsService()

    res.status(200).json({
        ok: true,
        posts
    })
}

export const getPost = async (req: Request, res: Response) => {
    const postId: number = Number(req.params.id)
    const post: Post | null = await getPostService(postId)

    res.status(200).json({
        ok: true,
        post
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, userId, content, image, createdAt } = req.body;

    if (!userId) {
      res.status(400).json({
        ok: false,
        message: "User ID is required to create a post"
      });
      return
    }

    const author = await UserRepository.findOneBy({id: userId})

    if (!author) {
      res.status(404).json({
        ok: false,
        message: "User not found"
      })
      return
    }

    const newPost = await createPostService({
      title,
      author,
      content,
      image,
      createdAt: createdAt || new Date().toISOString()
    })


    console.log(newPost)
    // Emitir el evento 'new_post' a todos los clientes conectados
    io.emit('new_post', newPost);  // Emitimos el post recién creado

    res.status(201).json({
        ok: true,
        message: "Post successfully created",
        newPost
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          ok: false,
          message: "Error creating post",
          error: error.message
      });
  }
}

export const getLastPost = async (req: Request, res: Response) => {
    try {
      const lastPost = await getLastPostService();
  
      res.status(200).json({
        ok: true,
        lastPost,
      });
    } catch (error:any) {
      res.status(error.statusCode || 500).json({
        ok: false,
        message: error.message || "Server error",
      });
    }
  }