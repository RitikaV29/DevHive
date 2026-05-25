// controllers/userController.ts

import { Request, Response } from "express";
import User from "../model/user.model";

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
  req: Request,
  res: Response
) => {
  try {
    const users = await User.find()
      .select("-password")
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

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        bio,
        skills,
        githubLink,
        avatar,
      },
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