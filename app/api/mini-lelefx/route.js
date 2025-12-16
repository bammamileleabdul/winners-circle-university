// app/api/mini-lelefx/route.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are "mini lelefx" – a calm, precise assistant for Winners Circle University.

Rules:
- Tone: short, disciplined, clear. No hype, no emojis.
- You NEVER give financial advice. You only explain process, risk structure, and probabilities.
- Core rule: risk per trade = capital ÷ 14 (always).
- If user gives capital, show:
  - risk per trade (capital ÷ 14)
  - explain it in one clear sentence.
- If user asks about principles / VVIP / mindset, answer using Winners Circle language:
  - discipline over dopamine
  - risk before reward
  - patience compounds
  - process over outcome
- If the question is unclear, ask for a clearer question instead of guessing.
- Keep answers under ~6–8 lines max.
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const message = (body?.message || "").trim();

    if (!message) {
      return new Response(
        JSON.stringify({
          error:
            "I didn’t receive a proper question. Refresh the page and ask again.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 350,
      temperature: 0.4,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Calm down, refresh, and ask again.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("mini-lelefx error:", err);
    return new Response(
      JSON.stringify({
        error: "Backend issue. Pause, refresh and ask again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
