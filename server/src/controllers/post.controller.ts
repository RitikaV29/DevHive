import { Request, Response } from "express";
import Post from "../models/post.model";
import mongoose from "mongoose";
//Create Post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, postType, githubLink, liveLink, techStack } = req.body;
    const files = req.files as Express.Multer.File[];
    const media = files?.map((file) => {
      const mediaType: "image" | "video" = file.mimetype.startsWith("video")
        ? "video"
        : "image";

      return {
        url: file.path,
        mediaType,
      };
    });
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await Post.create({
      user: req.user._id,
      content,
      postType,
      media,
      likes: [],
      comments: [],
      githubLink,
      liveLink,
      techStack,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
     const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const posts = await Post.find().populate("user", "name username avatar");
   
   const postsWithLikeStatus = posts.map((post) => {
  const postObject = post.toObject();

  const isLiked = userId
    ? post.likes.some(
        (id) => id.toString() === userId.toString()
      )
    : false;

  const isSaved = userId
    ? post.savedBy.some(
        (id) => id.toString() === userId.toString()
      )
    : false;

  return {
    ...postObject,
    isLiked,
    isSaved,
  };
});

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts: postsWithLikeStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const getPostByUserId = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;

    const posts = await Post.find({ user: userId });

    const postsWithLikeStatus = posts.map((post) => {
  const postObject = post.toObject();

  const isLiked = userId
    ? post.likes.some(
        (id) => id.toString() === userId.toString()
      )
    : false;

  const isSaved = userId
    ? post.savedBy.some(
        (id) => id.toString() === userId.toString()
      )
    : false;

  return {
    ...postObject,
    isLiked,
    isSaved,
  };
});
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts: postsWithLikeStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { content, postType, githubLink, liveLink } = req.body;
    let techStack = [];

    if (req.body.techStack) {
      techStack = JSON.parse(req.body.techStack);
    }

    // Existing media sent from frontend
    let existingMedia = [];

    if (req.body.existingMedia) {
      existingMedia = JSON.parse(req.body.existingMedia);
    }

    // New uploaded files
    const files = req.files as Express.Multer.File[];

    const newMedia =
      files?.map((file) => {
        const mediaType: "image" | "video" = file.mimetype.startsWith("video")
          ? "video"
          : "image";

        return {
          url: file.path,
          mediaType,
        };
      }) || [];

    // Combine existing + new media
    const media = [...existingMedia, ...newMedia];

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        content,
        postType,
        media,
        githubLink: postType === "project" ? githubLink : "",
        liveLink: postType === "project" ? liveLink : "",
        techStack: postType === "project" ? techStack : [],
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("user", "name username avatar");

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
const userObjectId = new mongoose.Types.ObjectId(userId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(userObjectId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        likes: post.likes,
      });
    }

    post.likes.push(userObjectId);

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likes: post.likes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const toggleSavePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isSaved = post.savedBy.includes(userObjectId);

    if (isSaved) {
      post.savedBy = post.savedBy.filter(
        (id) => id.toString() !== userId.toString()
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unsaved successfully",
        savedBy: post.savedBy,
      });
    }

    post.savedBy.push(userObjectId);

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post saved successfully",
      savedBy: post.savedBy,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};