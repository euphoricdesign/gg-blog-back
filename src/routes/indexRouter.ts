import { Router } from "express";
import postRouter from "./postRoutes";
import authRouter from "./authRoutes";

const router = Router()

router.use('/post', postRouter)
router.use('/auth', authRouter)

export default router