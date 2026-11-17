import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

//create comment
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

//get comments by post id
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

//delete comment
// export const deleteComment = async (req: Request, res: Response) => {
//   try {
//     const commentId = req.params.id;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     const comment = await Comment.findById(commentId);

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     const post = await Post.findById(comment.post);

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     const isCommentOwner =
//       comment.user.toString() === userId.toString();

//     const isPostOwner =
//       post.user.toString() === userId.toString();

//     if (!isCommentOwner && !isPostOwner) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not allowed to delete this comment",
//       });
//     }

//     // Delete comment
//     await Comment.findByIdAndDelete(commentId);

//     // Remove comment ID from Post
//     post.comments = post.comments.filter(
//       (id) => id.toString() !== commentId.toString()
//     );

//     await post.save();

//     return res.status(200).json({
//       success: true,
//       message: "Comment deleted successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error,
//     });
//   }
// };

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

    // Find all replies of this comment
    const replies = await Comment.find({
      parentComment: commentId,
    });

    // Collect comment and reply IDs
    const commentIds = [
      comment._id,
      ...replies.map((reply) => reply._id),
    ];

    // Delete comment and its replies
    await Comment.deleteMany({
      _id: { $in: commentIds },
    });

    // Remove all deleted IDs from Post.comments
    post.comments = post.comments.filter(
      (id) =>
        !commentIds.some(
          (deletedId) => deletedId.toString() === id.toString()
        )
    );

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment and replies deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting comment:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//reply to comment
export const createReply = async (req: Request, res: Response) => {
  try {
    const { content, parentCommentId } = req.body;
    const postId = req.params.postId;
    const userId = req.user?._id;

    // Authentication check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Content validation
    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply content is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find parent comment belonging to this post
    const parentComment = await Comment.findOne({
      _id: parentCommentId,
      post: postId,
      parentComment: null,
    });

    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });
    }

    const newReply = await Comment.create({
      user: userId,
      post: post._id,
      content: content.trim(),
      parentComment: parentComment._id,
    });

    post.comments.push(newReply._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Reply created successfully",
      reply: newReply,
    });

  } catch (error) {
    console.error("Error creating reply:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};