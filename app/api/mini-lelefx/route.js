import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are mini lelefx — a disciplined analytical assistant for Winners Circle University.

Rules:
- No hype
- No predictions
- No financial advice
- Focus on structure, risk, probability, and discipline
- Risk per position is always capital divided by 14
- You may simulate past-aligned scenarios, not guarantees
- Promote patience, process, and Winners Circle philosophy subtly

Tone:
Calm. Precise. Confident. Minimal.
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.4,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    return Response.json(
      { reply: "System unavailable. Pause and reassess." },
      { status: 500 }
    );
  }
}
