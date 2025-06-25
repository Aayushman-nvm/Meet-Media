import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/*Reading routes and returning info */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*Updating the list of friends */

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
