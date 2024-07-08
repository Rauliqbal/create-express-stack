// Read more visit https://expressjs.com/en/guide/routing.html

import express from "express";
import { createPost } from "../controllers/postController.js";
import { getUser, login, register } from "../controllers/userController.js";
import { authentication } from "../middlewares/auth.js";


const router = express.Router();

// Route Post
router.get("/post", createPost);

// Route Auth
router.post('/register', register)
router.post('/login', login)
router.get('/user', authentication, getUser)

export default router;
