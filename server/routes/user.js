import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Read
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

//Update
router.patch("/:id/:friendID",verifyToken,addRemoveFriends);

export default router;