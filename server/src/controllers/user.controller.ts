// controllers/userController.ts

import { Request, Response } from "express";
import User from "../models/user.model";

interface AuthRequest extends Request {
  user?: any;
}

// ================= GET PROFILE =================

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("followers following", "name username email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ================= GET ALL USERS =================

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId= req.user?._id as string;
    const {search,skill}= req.query as {search?: string, skill?: string};
    const query:any={
      _id: { $ne: userId },
      role: "user",
    }
     if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by skill
    if (skill) {
      query.skills = {
        $regex: skill,
        $options: "i",
      };
    }
    const users = await User.find(query)
      .select("-password -email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ================= GET SINGLE USER =================

export const getSingleUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers following", "name username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ================= UPDATE PROFILE =================

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      name,
      bio,
      skills,
      githubLink,
      avatar,
    } = req.body;

   const updates: any = {};

if (name !== undefined) updates.name = name;
if (bio !== undefined) updates.bio = bio;
if (skills !== undefined) updates.skills = skills;
if (githubLink !== undefined) updates.githubLink = githubLink;
if (avatar !== undefined) updates.avatar = avatar;

const updatedUser = await User.findByIdAndUpdate(
  req.user._id,
  { $set: updates },
  {
    new: true,
    runValidators: true,
  }
).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// ================= DELETE USER =================

export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findByIdAndDelete(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};