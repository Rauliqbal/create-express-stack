import express from "express";
import { createPost } from "../controllers/postController.js";

const router = express.Router()

// Route Post
router.get('/post', createPost)

export default router
