import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

async function main() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with only: Hello",
    });

    console.log(response.text);
  } catch (e) {
    console.error("FULL ERROR:");
    console.error(e);
  }
}

main();