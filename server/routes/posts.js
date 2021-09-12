import express from 'express';
import { getPosts } from '../contollers/posts.js';
import { createPost } from '../contollers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
