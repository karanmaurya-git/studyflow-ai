import StudyPlan from "../models/StudyPlan.js";
import { generateStudyPlan } from "../services/geminiService.js";

// Generate and Save Study Plan
export const createStudyPlan = async (req, res) => {
  try {
    const { syllabus, examDate, hoursPerDay } = req.body;

    if (!syllabus || !examDate || !hoursPerDay) {
      return res.status(400).json({
        success: false,
        message: "Please provide syllabus, examDate and hoursPerDay.",
      });
    }

    const aiResponse = await generateStudyPlan({
      syllabus,
      examDate,
      hoursPerDay,
    });

    const savedPlan = await StudyPlan.create({
      user: req.user._id,
      syllabus,
      examDate,
      hoursPerDay,
      studyPlan: aiResponse.plan,
    });

    return res.status(200).json({
      success: true,
      studyPlan: savedPlan,
      generatedBy: aiResponse.generatedBy,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Saved Plans
export const getStudyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Study Plan
export const deleteStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Study plan not found.",
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Study plan deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};