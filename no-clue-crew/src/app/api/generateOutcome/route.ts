import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

/**
 * Server-side route handler that calls Google Gemini (Generative Language) API.
 * - Set GOOGLE_API_KEY in your environment (server only).
 * - This file uses the app router route handler location: /src/app/api/generateOutcome/route.ts
 *
 * The handler is defensive: if GOOGLE_API_KEY is not set or the upstream call fails,
 * it will return a simple fallback string so development can continue.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, age, choiceText, resultText } = body ?? {};

    if (type !== "learnMore" || !choiceText || !resultText) {
      return "Financeial literacy is important!";
    }

    const prompt = `You are a friendly financial literacy educator for kids and teens aged 10. 
A young person made this decision: "${choiceText}"
The outcome was: "${resultText}"
Provide a brief, engaging explanation (2 short sentences ) that:
1) Explains the financial concept in simple terms
2) Gives a practical tip or example
3) Encourages smart money habits in a positive tone.
Keep language age-appropriate and concise.`;

    if (!apiKey) {
      console.log("generateOutcome: GEMINI API key not set; returning fallback text");
      return NextResponse.json({ text: `Tip: ${resultText}` });
    }

    // Use the server-side client to call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // adjust model name if needed
      // some clients accept a single string; others expect structured contents
      // pass the prompt as a plain string to match the client's Part type
      contents: [prompt],
    });

    // best-effort extraction of generated text
    let text =
      // common shapes
      (response as any)?.candidates?.[0]?.content?.[0]?.text ||
      (response as any)?.text ||
      (response as any)?.output?.[0]?.content?.map((c: any) => c.text || c?.plainText || c?.text)?.join(" ") ||
      JSON.stringify(response).slice(0, 2000);

    return NextResponse.json({ text });
  } catch (err) {
    console.error("generateOutcome route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}