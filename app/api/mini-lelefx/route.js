import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
You are "mini lelefx" for Winners Circle University.
Tone: calm, precise, luxury execution.
Rules:
- Not financial advice. Education + process only.
- Focus on discipline, risk structure, probability, and clean execution.
- If user asks for "risk", use constant rule: risk = capital / 14.
- If user asks about WCU, explain: performance-based gold trading framework, structured rules, disciplined execution, VVIP is invitation only.
- Keep answers concise unless user asks for detail.
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Server missing OPENAI_API_KEY. Add it in Vercel env vars." },
        { status: 500 }
      );
    }

    // Build a clean messages array (only user/assistant)
    const cleaned = messages
      .filter((m) => m && typeof m.content === "string")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...cleaned],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    const data = await openaiRes.json().catch(() => null);

    if (!openaiRes.ok) {
      const msg =
        data?.error?.message ||
        `OpenAI error (${openaiRes.status}). Check Vercel function logs.`;
      return NextResponse.json({ reply: msg }, { status: 500 });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No reply returned. Try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { reply: "Server error. Try again in a moment." },
      { status: 500 }
    );
  }
}
