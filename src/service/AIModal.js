import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  input: "Explain how AI works in a few words",
});
console.log(response.text);