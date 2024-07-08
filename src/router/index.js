// Read more visit https://expressjs.com/en/guide/routing.html

import express from "express";
import { createPost } from "../controllers/postController.js";
import { login, register } from "../controllers/userController.js";


const router = express.Router();

// Route Post
router.get("/post", createPost);

// Route Auth
router.post('/register', register)
router.post('/login', login)

export default router;
