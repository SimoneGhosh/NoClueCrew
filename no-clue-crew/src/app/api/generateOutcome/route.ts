import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, age, choiceText, resultText } = body ?? {};

    if (type !== "learnMore" || !choiceText || !resultText) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const prompt = `You are a friendly financial literacy educator for kids and teens aged ${age}.
A young person made this decision: "${choiceText}"
The outcome was: "${resultText}"
Provide a brief, engaging explanation (2 short sentences) that:
1) Explains the financial concept in simple terms
2) Gives a practical tip or example
3) Encourages smart money habits in a positive tone.
Keep language age-appropriate and concise.`;

    if (!apiKey) {
      console.log("generateOutcome: GEMINI API key not set; returning fallback text");
      return NextResponse.json({ text: `Tip: ${resultText}` });
    }

    // Use Gemini 2.0 Flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      // pass the prompt as a text content part
      contents: [{  text: prompt }],
    });

    // best-effort extraction of generated text
    let text =
      (response as any)?.candidates?.[0]?.content?.[0]?.text ||
      (response as any)?.text ||
      (response as any)?.output?.[0]?.content?.map((c: any) => c.text || c?.plainText || "").join(" ") ||
      JSON.stringify(response).slice(0, 2000);

    return NextResponse.json({ text });
  } catch (err) {
    console.error("generateOutcome route error:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}