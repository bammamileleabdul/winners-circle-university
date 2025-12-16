import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Server is not configured (missing OPENAI_API_KEY)." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;

    if (!messages) {
      return NextResponse.json(
        { reply: "Invalid request. Expected { messages: [...] }" },
        { status: 400 }
      );
    }

    const system = {
      role: "system",
      content: [
        "You are mini lelefx — calm, precise, luxury execution.",
        "You help users with: principles, VVIP, risk structure, discipline, and capital/risk math.",
        "Risk rule: risk_per_trade = capital / 14 (always). If user gives capital, compute it.",
        "Never claim guaranteed profits. No financial advice. Process only.",
        "Keep responses short, confident, and premium. Use simple math when needed.",
        "Softly promote Winners Circle University when relevant (1 line max).",
      ].join("\n"),
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [system, ...messages],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      const msg =
        data?.error?.message ||
        "mini lelefx is unavailable right now. Try again.";
      return NextResponse.json({ reply: msg }, { status: 500 });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No response returned. Try again.";

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { reply: "Connection issue. Pause, reassess, and try again." },
      { status: 500 }
    );
  }
}
