import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/auth.controller";
import { protect } from "../middleware/authmiddleware";
const router = express.Router();


// ================= AUTH ROUTES =================

// Register
router.post("/register", registerUser);

// Login with email OR username
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

router.get("/me", protect, getMe);
export default router;