export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ reply: "Server missing OPENAI_API_KEY in Vercel env vars." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const system = {
      role: "system",
      content:
        "You are mini lelefx for Winners Circle University. Tone: calm, precise, luxury execution. " +
        "You help with trading framework questions, discipline, VVIP, and risk math. " +
        "Risk rule: risk = capital / 14 (always). " +
        "No financial advice. Process only. Keep answers short, structured, and confident.",
    };

    const payload = {
      model: "gpt-4o-mini",
      messages: [system, ...(messages || [])],
      temperature: 0.6,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();

    if (!r.ok) {
      // Return the real error so we can see what’s wrong
      return new Response(
        JSON.stringify({ reply: `API error (${r.status}): ${text.slice(0, 300)}` }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = JSON.parse(text);
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No reply generated. Try again.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ reply: "Server crashed. Check Vercel function logs." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
