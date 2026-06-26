import Task from "../models/Task.js";
import Subject from "../models/Subject.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 📌 Get all tasks of user
    const tasks = await Task.find({ user: userId });

    // 📌 Get all subjects of user
    const subjects = await Subject.find({ user: userId });

    // 📊 Task stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;

    // 📈 Progress calculation
    const progress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        totalSubjects: subjects.length,
        progress
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};