import { Request, Response } from "express";
import Post from "../models/post.model";
//Create Post
export const createPost=async(req:Request,res:Response)=>{
   try{
     const {content,postType,githubLink,liveLink,techStack}=req.body;
     const files=req.files as Express.Multer.File[];
   const media = files?.map((file) => {
  
  const mediaType: "image" | "video" =
    file.mimetype.startsWith("video")
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
    const post =await Post.create({
      user:req.user._id,
      content,
      postType,
      media,
      likes :[],
      comments :[],
      githubLink,
      liveLink,
      techStack,
    })

    res.status(201).json({
      success:true,
      message:"Post created successfully",
      post,
    })
   }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error",
      error,
    })
   }
}



export const getAllPosts=async(req:Request,res:Response)=>{
  try{
    const posts=await Post.find().populate("user", "name username avatar");
    res.status(200).json({
      success:true,
      message:"Posts fetched successfully",
      posts,
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error",
      error,
    })
  }
}

export const getPostByUserId=async(req:Request,res:Response)=>{
  try{
    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}
    const userId=req.user._id;
    const posts=await Post.find({user:userId});
    res.status(200).json({
      success:true,
      message:"Posts fetched successfully",
      posts,
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error",
      error,
    })
  }
}

export const deletePost=async(req:Request,res:Response)=>{
  try{
    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}
    const postId=req.params.id;
    const post=await Post.findById(postId);
    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      })
    }
    if(post.user.toString()!==req.user._id.toString()){
      return res.status(403).json({
        success:false,
        message:"Unauthorized",
      })
    }
    await post.deleteOne();
    res.status(200).json({
      success:true,
      message:"Post deleted successfully",
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error",
      error,
    })
  }
}