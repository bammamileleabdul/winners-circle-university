// app/api/mini-lelefx/route.js

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body || {};

    // Fallback if something weird is sent
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          reply:
            "I didn’t receive a proper question. Refresh the page and ask again.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are mini lelefx, the calm, precise assistant for Winners Circle University. \
You talk about gold trading, risk management, R-multiples and the Winners Circle process. \
You NEVER give financial advice or guarantees. You always remind that results are hypothetical \
and focus on process, discipline, and probabilities. Keep replies tight, structured and clean.",
        },
        ...messages,
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "I couldn’t generate a reply. Try again in a moment.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("mini-lelefx error:", err);

    // Still return 200 with a friendly message so the frontend never crashes
    return new Response(
      JSON.stringify({
        reply:
          "Server side issue on my end. Give it a second and try again — if it keeps happening, tell Lelefx.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
