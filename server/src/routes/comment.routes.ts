import express from "express";
import { createComment,getCommentsByPostId } from "../controllers/comment.controller";
import { protect } from "../middleware/authmiddleware";
const router = express.Router();
router.post("/createComment/:postId",protect, createComment);
router.get("/getCommentsByPostId/:postId",protect,getCommentsByPostId);
export default router;