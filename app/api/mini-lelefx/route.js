import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const systemPrompt = `
You are mini lelefx — the official AI assistant of Winners Circle University.

Your role:
- Help users understand trading concepts clearly
- Calculate risk using this rule ONLY:
  Risk per trade = capital ÷ 14
- Explain results calmly and professionally
- Never promise profits
- Never predict the future
- Speak with confidence, precision, and discipline
- Promote Winners Circle naturally when relevant

Tone:
Luxury. Calm. Precise. No hype. No emojis.

If asked about profits:
Explain what *could* happen using past-style logic, not predictions.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return new Response(
      JSON.stringify({ reply: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "mini lelefx is unavailable" }),
      { status: 500 }
    );
  }
}
