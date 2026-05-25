import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/auth.controller";

const router = express.Router();


// ================= AUTH ROUTES =================

// Register
router.post("/register", registerUser);

// Login with email OR username
router.get("/login", loginUser);

// Logout
router.post("/logout", logoutUser);


export default router;