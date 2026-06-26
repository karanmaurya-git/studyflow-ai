import Task from "../models/Task.js";
import Subject from "../models/Subject.js";

// ===============================
// CREATE TASK
// ===============================
export const createTask = async (req, res) => {
  try {
    const { subject, title, description, priority, dueDate } = req.body;

    if (!subject || !title) {
      return res.status(400).json({
        success: false,
        message: "Subject and title are required",
      });
    }

    const subjectExists = await Subject.findOne({
      _id: subject,
      user: req.user._id,
    });

    if (!subjectExists) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const task = await Task.create({
      user: req.user._id,
      subject,
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET TASKS
// ===============================
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    })
      .populate("subject", "name color")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TOGGLE TASK STATUS
// ===============================
export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status =
      task.status === "completed"
        ? "pending"
        : "completed";

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE TASK
// ===============================
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // If subject is being changed, verify ownership
    if (req.body.subject) {
      const subjectExists = await Subject.findOne({
        _id: req.body.subject,
        user: req.user._id,
      });

      if (!subjectExists) {
        return res.status(404).json({
          success: false,
          message: "Subject not found",
        });
      }

      task.subject = req.body.subject;
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.priority = req.body.priority ?? task.priority;
    task.status = req.body.status ?? task.status;
    task.dueDate = req.body.dueDate ?? task.dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE TASK
// ===============================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};