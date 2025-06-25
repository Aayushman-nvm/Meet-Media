import express from "express";
import multer from "multer";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentPost,
  createPost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//Storage moved from index to postRoutes... 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//Upload thingy
const upload = multer({ storage });

//Posting from fost routes... is this what u were asking for?
router.post("/", upload.single("picture"), verifyToken, createPost);

/*Reading the db and getting the feed */

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/*Updating the db by liking or commenting on the post */

router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

export default router;