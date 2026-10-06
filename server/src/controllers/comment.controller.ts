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
    const userId = req.user?._id;
     const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const comments = await Comment.find({ post: postId }).populate("user", "username profilePicture name").sort({ createdAt: -1 });
    

    const commentsWithPermission = comments.map((comment) => {
      const isCommentOwner =
        comment.user._id.toString() === userId?.toString();

      const isPostOwner =
        post.user.toString() === userId?.toString();

      return {
        ...comment.toObject(),
        canDelete: isCommentOwner || isPostOwner,
      };
    });
 console.log("Comments from DB:", comments);
    res.status(200).json({
      message: "Comments fetched successfully",
      comments: commentsWithPermission,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const post = await Post.findById(comment.post);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isCommentOwner =
      comment.user.toString() === userId.toString();

    const isPostOwner =
      post.user.toString() === userId.toString();

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    // Delete comment
    await Comment.findByIdAndDelete(commentId);

    // Remove comment ID from Post
    post.comments = post.comments.filter(
      (id) => id.toString() !== commentId.toString()
    );

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};