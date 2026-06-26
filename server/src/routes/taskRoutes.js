import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

/* ===============================
   TASK ROUTES
=============================== */

// Create Task
router.post("/", protect, createTask);

// Get All Tasks
router.get("/", protect, getTasks);

// Update Task
router.put("/:id", protect, updateTask);

// Toggle Task Status (Pending ↔ Completed)
router.patch("/:id/status", protect, toggleTaskStatus);

// Delete Task
router.delete("/:id", protect, deleteTask);

export default router;