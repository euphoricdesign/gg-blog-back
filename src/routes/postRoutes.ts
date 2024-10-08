import { Router } from "express";
import { createPost, getAllPosts, getLastPost, getPost } from "../controllers/PostController";

const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', getAllPosts)
postRouter.get('/:id', getPost)

postRouter.get("/last", getLastPost)


export default postRouter