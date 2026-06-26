import express from "express";
import {
  createStudyPlan,
  getStudyPlans,
  deleteStudyPlan,
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate & Save AI Plan
router.post("/generate-plan", protect, createStudyPlan);

// Get All Saved Plans
router.get("/plans", protect, getStudyPlans);

// Delete Saved Plan
router.delete("/plans/:id", protect, deleteStudyPlan);

export default router;