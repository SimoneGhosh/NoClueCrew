import { NextRequest, NextResponse } from "next/server";

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

    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log("generateOutcome: OPENROUTER_API_KEY present?", Boolean(apiKey));

    if (!apiKey) {
      console.log("generateOutcome: OPENROUTER_API_KEY not set — returning fallback text");
      return NextResponse.json({ text: `Tip: ${resultText}` });
    }

    const url = "https://openrouter.ai/api/v1/chat/completions";

    let resp;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 512,
        }),
      });
    } catch (fetchErr: any) {
      console.error("generateOutcome: fetch threw:", fetchErr);
      return NextResponse.json(
        {
          error: "Upstream fetch failed",
          details: String(fetchErr?.message ?? fetchErr),
          text: `Tip: ${resultText}`,
        },
        { status: 502 }
      );
    }

    const respText = await resp.text();
    console.log("generateOutcome: openrouter status", resp.status);
    console.log("generateOutcome: upstream response (truncated):", respText.slice(0, 2000));

    if (!resp.ok) {
      return NextResponse.json({ error: "Upstream API error", details: respText, text: `Tip: ${resultText}` }, { status: 502 });
    }

    let data: any = {};
    try {
      data = JSON.parse(respText);
    } catch (e) {
      console.warn("generateOutcome: invalid JSON from upstream, using raw text");
    }

    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      (typeof respText === "string" ? respText : JSON.stringify(data).slice(0, 2000));

    return NextResponse.json({ text: String(text) });
  } catch (err) {
    console.error("generateOutcome route error:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}