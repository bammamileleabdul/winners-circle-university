// app/api/mini-lelefx/route.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body || {};

    // If nothing meaningful was sent
    if (!message || typeof message !== "string" || message.trim().length < 1) {
      return new Response(
        JSON.stringify({
          reply:
            "I didn’t get a clear question. Try something like:\n\n" +
            "• \"Explain capital ÷ 14 risk with £1,400\"\n" +
            "• \"If I risk £100 per trade, how many trades until £2,000?\"",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
You are mini lelefx, a calm, precise trading assistant for Winners Circle University.

Rules:
- Focus on gold (XAUUSD) trading, risk management, and discipline.
- Use the capital ÷ 14 rule for risk per trade when relevant.
- You are NOT giving financial advice, only process and risk structure.
- Speak clearly and simply. Short paragraphs. No emojis.
- If user gives capital, calculate risk = capital ÷ 14 and explain it.
- If user asks about VVIP, explain it's earned through consistency and alignment.
        `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_output_tokens: 350,
    });

    const text =
      completion.output?.[0]?.content?.[0]?.text?.trim() ||
      "I processed that, but struggled to form a reply. Rephrase your question once and try again.";

    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("mini-lelefx error:", err);

    return new Response(
      JSON.stringify({
        reply:
          "Server issue my side. Refresh the page, give it a few seconds, and ask again.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
