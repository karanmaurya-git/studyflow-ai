import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

/* =========================
   SUBJECT ROUTES
========================= */

router.post("/", protect, createSubject);
router.get("/", protect, getSubjects);
router.put("/:id", protect, updateSubject);
router.delete("/:id", protect, deleteSubject);

export default router;