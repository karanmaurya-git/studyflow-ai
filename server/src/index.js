import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be FIRST

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// 🔥 Debug: Check environment variables
console.log("🔑 GEMINI KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");
console.log("🌍 NODE ENV:", process.env.NODE_ENV || "development");

connectDB();

const app = express();

// ========================
// ✅ MIDDLEWARE
// ========================
// ========================
// ✅ CORS CONFIGURATION
// ========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://studyflow-ai-eight.vercel.app",
  "https://studyflow-ai-git-main-karanmaurya-vercel.vercel.app",
  "https://studyflow-7rctsucw0-karanmaurya-vercel.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, server-to-server, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ========================
// ✅ BASE ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("StudyFlow AI Backend Running 🚀");
});

// ========================
// ✅ HEALTH CHECK ROUTE
// ========================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy 🚀",
  });
});

// ========================
// ✅ GEMINI KEY TEST ROUTE
// ========================
app.get("/api/test-key", (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "GEMINI_API_KEY is NOT loaded ❌",
    });
  }

  return res.json({
    success: true,
    message: "GEMINI_API_KEY is loaded ✅",
    preview: apiKey.slice(0, 8) + "****",
  });
});

// ========================
// ✅ ROUTES
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

// ========================
// ✅ ERROR HANDLING (IMPORTANT ADDITION)
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ========================
// ✅ START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});