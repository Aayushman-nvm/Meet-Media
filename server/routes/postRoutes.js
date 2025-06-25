import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/*Reading the db and getting the feed */

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/*Updating the db by liking or unliking the post */

router.patch("/:id/like", verifyToken, likePost);

export default router;
