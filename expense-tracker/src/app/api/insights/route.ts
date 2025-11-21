import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { analytics } = await req.json();

    const prompt = `
     You are an AI personal finance assistant analyzing user spending.

STRICT RULES:
- Use Indian context
- Always use INR (₹), NEVER USD
- Keep insights concise
- Do NOT add offers like “I can provide more insights”
- Do NOT ask follow-up questions
- Do NOT talk about the model or being an AI
- Output plain text only
- Do NOT use headings or titles.
- Do NOT use asterisks (*)

Here is the user analytics:
${JSON.stringify(analytics, null, 2)}

Generate 4–5 finance insights plus recommendations.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // free + very fast
      messages: [
        { role: "user", content: prompt }
      ]
    });

    return NextResponse.json({
      insights: completion.choices[0].message.content
    });
  } catch (err) {
    console.error("GROQ AI Error ->", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
