import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY env var on Vercel." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const system = `
You are "mini lelefx" — a premium, calm, disciplined assistant for Winners Circle University.
Tone: confident, luxurious, concise, chill-to-the-bone. No hype, no cringe.

You can:
- Answer questions about the site, principles, manifesto, VVIP concept.
- Help with trading psychology + process (NOT financial advice).
- Do simple calculators when asked.

Rule: If user asks "how much should I risk?" your default is:
risk_per_trade = capital / 14

Never promise profits, never give guaranteed returns.
If asked for signals, refuse and guide to process/risk.
`.trim();

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 350,
        messages: [
          { role: "system", content: system },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "OpenAI request failed." },
        { status: 500 }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || "…";

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}
