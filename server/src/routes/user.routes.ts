// routes/userRoutes.ts

import express from "express";

import {
  getProfile,
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
} from "../controller/user.controller";



import { protect } from "../middleware/authmiddleware";

const router = express.Router();

// protected routes
router.get("/profile", protect, getProfile);

router.put("/profile/update", protect, updateProfile);

router.delete("/profile/delete", protect, deleteUser);

// public routes
router.get("/getAll/profile", getAllUsers);

router.get("/:id/getSingle/profile", getSingleUser);

export default router;