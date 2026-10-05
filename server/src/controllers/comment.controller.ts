import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { content } = req.body;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newComment = await Comment.create({
      user: userObjectId,
      post: post._id,
      content,
    });

    post.comments.push(newComment._id);

    await post.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (err) {
    console.error("Error creating comment:", err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try{
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate("user", "username profilePicture name").sort({ createdAt: -1 });
 console.log("Comments from DB:", comments);
    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
