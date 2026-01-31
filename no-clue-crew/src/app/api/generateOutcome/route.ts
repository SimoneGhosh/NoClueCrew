import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const prompt = `You are a friendly financial literacy educator for kids and teens aged ${age}. 
A young person made this decision: "${choiceText}"
The outcome was: "${resultText}"
Provide a brief, engaging explanation (2 short paragraphs) that:
1) Explains the financial concept in simple terms
2) Gives a practical tip or example
3) Encourages smart money habits in a positive tone.
Keep language age-appropriate and concise.`;

    if (!apiKey) {
      // fallback for local dev
      return NextResponse.json({ text: "Generated fallback: " + resultText });
    }

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.7,
          maxOutputTokens: 512,
        }),
      }
    );

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Upstream error:", errText);
      return NextResponse.json(
        { error: "Upstream API error", details: errText },
        { status: 502 }
      );
    }

    const data = await resp.json();

    // robust extraction of generated text
    let text =
      data?.candidates?.[0]?.content?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.text ||
      data?.output?.[0]?.content ||
      null;

    if (!text) {
      // fallback: stringify a portion of response
      text = JSON.stringify(data).slice(0, 1000);
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("generateOutcome route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
