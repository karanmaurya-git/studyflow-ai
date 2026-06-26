import { GoogleGenAI } from "@google/genai";

export const generateStudyPlan = async ({
  syllabus,
  examDate,
  hoursPerDay,
}) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert study planner.

Create a realistic study plan.

Syllabus:
${syllabus}

Exam Date:
${examDate}

Study Hours Per Day:
${hoursPerDay}

Return only the study plan in plain text.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const plan =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!plan) {
      throw new Error("Empty response from Gemini");
    }

    return {
      plan,
      generatedBy: "Gemini AI",
    };
  } catch (error) {
    console.log("Gemini unavailable. Using fallback plan.");

    const fallbackPlan = `
STUDY PLAN

Day 1
• Study first part of the syllabus
• Make short notes

Day 2
• Continue remaining topics
• Solve practice questions

Day 3
• Revise everything covered
• Attempt one mock test

Repeat this cycle until your exam date.

Study ${hoursPerDay} hour(s) every day.

Exam Date:
${examDate}
`;

    return {
      plan: fallbackPlan,
      generatedBy: "Fallback Planner",
    };
  }
};