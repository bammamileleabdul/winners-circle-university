import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "Server is missing OPENAI_API_KEY (Vercel env var not set)." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;

    if (!messages || messages.length === 0) {
      return Response.json(
        { reply: "Send a messages[] array to mini lelefx." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey });

    const system = {
      role: "system",
      content:
        "You are mini lelefx, the Winners Circle assistant. Tone: calm, elite, disciplined, premium. " +
        "You help with trading mindset, risk structure, and clear execution. No hype, no guarantees. " +
        "If user asks about profit simulations: risk per trade = capital / 14 (constant). " +
        "If user asks unrelated questions, answer briefly and still sound premium. " +
        "Never claim certainty about future returns. Encourage patience and structure."
    };

    const completion = await client.chat.completions.create({
      model: "o3-mini",
      messages: [system, ...messages],
      temperature: 0.6
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "No reply generated. Try again.";

    return Response.json({ reply });
  } catch (err) {
    return Response.json(
      { reply: "Server error. Check Vercel logs for /api/mini-lelefx." },
      { status: 500 }
    );
  }
}
