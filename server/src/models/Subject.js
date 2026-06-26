import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    color: {
      type: String,
      default: "#4f46e5"
    },

    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);