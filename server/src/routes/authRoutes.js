import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

/* =========================
   AUTH ROUTES
========================= */

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Test route (for debugging)
router.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello Route Working",
  });
});

// Protected profile route
router.get("/profile", protect, getProfile);

export default router;