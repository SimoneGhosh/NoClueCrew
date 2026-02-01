import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Fallback lessons data - matches the stories from gamestory.js
 * Used when the API call fails or is unavailable
 */
const storyLessons: Record<string, string> = {
  "14": "Saving for experiences teaches that money can be used for meaningful goals, not just quick fun. Try setting aside a little money each week for something special you really care about.",
  "15": "Balancing work and leisure is crucial. While earning money is important, so is enjoying your free time. Find a balance that works for you.",
  "16": "Saving for big needs shows the difference between wants and necessities. Planning ahead can give you independence without running out of money.",
  "17": "Planning for education costs helps avoid money stress later. Applying early and making a budget can save you a lot in the future.",
  "18": "Choosing affordable options helps keep debt under control. You can still chase your dreams while being smart about how much you borrow.",
  "22": "Building an emergency fund is essential for financial security. It helps you handle unexpected expenses without going into debt.",
  "27": "Investing early allows your money to grow over time. The sooner you start, the more you can benefit from compound growth.",
  "30": "Choosing affordable options helps keep debt under control. You can still chase your dreams while being smart about how much you borrow.",
  "35": "Increasing retirement contributions early can lead to a more comfortable future. It's important to prioritize long-term savings over short-term luxuries.",
  "42": "Paying off high-interest debt quickly can save you money in the long run. It's better to tackle debt aggressively than to make only minimum payments.",
  "50": "Downsizing and saving aggressively can provide financial security in retirement. It's important to live within your means and prioritize savings.",
  "61": "Finalizing a retirement plan provides clarity and direction. It's essential to have a strategy in place rather than leaving things to chance.",
  "67": "Living within your means during retirement is crucial for long-term stability. It's important to budget and avoid overspending.",
  "70": "Planning for estate and healthcare costs is essential to avoid burdening your family later. Proactive financial planning can ensure peace of mind.",
  "82": "Reflecting on your financial choices can provide valuable insights for the future. It's never too late to learn from past mistakes and make better decisions."
};

/**
 * Server-side route handler that calls Google Gemini (Generative Language) API.
 * Falls back to predefined lessons from gamestory.js if API fails or is unavailable.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, age, choiceText, resultText } = body ?? {};

    if (type !== "learnMore" || !choiceText || !resultText) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // If no API key is set, immediately return the lesson fallback
    if (!apiKey || !ai) {
      console.log("generateOutcome: API key not set; returning lesson from gamestory.js");
      const lesson = storyLessons[age.toString()] || "Keep learning about money management to build a secure financial future!";
      return NextResponse.json({ text: lesson });
    }

    const prompt = `You are a friendly financial literacy educator for kids and teens aged 10. 
A young person made this decision: "${choiceText}"
The outcome was: "${resultText}"
Provide a brief, engaging explanation (2 short sentences) that:
1) Explains the financial concept in simple terms
2) Gives a practical tip or example
3) Encourages smart money habits in a positive tone.
Keep language age-appropriate and concise.`;

    try {
      // Use the server-side client to call Gemini
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [prompt],
      });

      // best-effort extraction of generated text
      let text =
        (response as any)?.candidates?.[0]?.content?.[0]?.text ||
        (response as any)?.text ||
        (response as any)?.output?.[0]?.content?.map((c: any) => c.text || c?.plainText || c?.text)?.join(" ") ||
        null;

      // If we got a valid response, return it
      if (text && text.trim().length > 0) {
        return NextResponse.json({ text });
      }
      
      // Otherwise fall through to the lesson fallback
      throw new Error("Empty or invalid API response");
      
    } catch (apiError) {
      // API call failed - fall back to lesson from gamestory.js
      console.log("generateOutcome: API call failed, falling back to lesson from gamestory.js");
      const lesson = storyLessons[age.toString()] || "Keep learning about money management to build a secure financial future!";
      return NextResponse.json({ text: lesson });
    }

  } catch (err) {
    console.error("generateOutcome route error:", err);
    // Even in case of unexpected errors, try to return a lesson
    const lesson = "Managing money wisely is an important life skill. Keep learning and making smart financial choices!";
    return NextResponse.json({ text: lesson });
  }
}