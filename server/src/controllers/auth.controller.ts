import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// ================= REGISTER =================

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;

    // validation
    if (!name || !username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });

      return;
    }

    // existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });

      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );
    const { password: _, ...safeUser } = user.toObject();
    // cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // send cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
      
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= Login =================

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { loginId, password } = req.body;

    // validation
    if (!loginId || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });

      return;
    }

    // find user by email OR username
    const user = await User.findOne({
      $or: [
        { email: loginId.toLowerCase() },
        { username: loginId.toLowerCase() },
      ],
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

      return;
    }

    // generate jwt
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );
    const { password: _, ...safeUser } = user.toObject();
    // cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= Logout =================

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
