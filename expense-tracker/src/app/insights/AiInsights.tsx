import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAIInsights(analytics) {
  const prompt = `
    You are a financial analyst. Analyze this data:
    ${JSON.stringify(analytics)}

    Provide 3 insights and a suggestion.
    Keep it short.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
