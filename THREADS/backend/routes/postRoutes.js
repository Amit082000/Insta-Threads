import express from "express";

import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:postId", getPost);
router.post("/create",protectRoute, createPost);
router.delete("/:id",protectRoute, deletePost);
router.delete("/user/:username",protectRoute, getUserPosts);
router.put("/like/:id",protectRoute, likeUnlikePost);
router.put("/reply/:id",protectRoute, replyToPost );



export default router; 
