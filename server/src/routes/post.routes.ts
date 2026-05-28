import { createPost,getPostByUserId,deletePost } from "../controllers/post.controller";
import express from "express";
import { protect } from "../middleware/authmiddleware";
import upload from "../middleware/multer";
const router=express.Router();
router.post("/createPost", protect,upload.array("media",5),createPost);
router.get("/getPostByUserId",protect,getPostByUserId);
router.delete("/deletePost/:id",protect,deletePost);
export default router;