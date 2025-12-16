import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
You are mini lelefx — the private analytical assistant for Winners Circle University.
Tone: calm, precise, luxury execution. Confident, but never hype.
Rules:
- Always emphasize discipline, risk structure, and probability — not prediction.
- If asked about risk: risk per trade = capital / 14 (constant).
- If user asks for profit simulation: clarify assumptions briefly, then calculate.
- Promote Winners Circle subtly when relevant (no spam).
- Not financial advice. Process only.
`;

function extractReply(data) {
  // Responses API sometimes returns output_text; if not, pull from output blocks.
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();

  const out = data?.output;
  if (!Array.isArray(out)) return "";

  const chunks = [];
  for (const item of out) {
    if (item?.type === "message" && Array.isArray(item?.content)) {
      for (const c of item.content) {
        if (c?.type === "output_text" && typeof c?.text === "string") chunks.push(c.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Support both shapes:
    // 1) { messages: [{role, content}, ...] }
    // 2) { message: "hello" }
    const incomingMessages = Array.isArray(body?.messages)
      ? body.messages
      : typeof body?.message === "string"
        ? [{ role: "user", content: body.message }]
        : [];

    if (!incomingMessages.length) {
      return NextResponse.json(
        { reply: "Send a question and I’ll respond with structure." },
        { status: 400 }
      );
    }

    const input = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      ...incomingMessages.filter((m) => m?.role && m?.content),
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Server missing OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input,
        temperature: 0.4,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { reply: "mini lelefx is temporarily unavailable. Try again in a moment." },
        { status: 500 }
      );
    }

    const reply = extractReply(data) || "I didn’t catch that — rephrase in one sentence.";
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { reply: "Connection issue. Pause, reassess, and try again." },
      { status: 500 }
    );
  }
}
