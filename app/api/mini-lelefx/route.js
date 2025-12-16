export const runtime = "nodejs";

function extractOutputText(data) {
  // The Responses API returns an `output` array with message items containing `output_text`.
  let text = "";
  const output = Array.isArray(data?.output) ? data.output : [];

  for (const item of output) {
    if (item?.type === "message" && Array.isArray(item?.content)) {
      for (const c of item.content) {
        if (c?.type === "output_text" && typeof c?.text === "string") {
          text += c.text;
        }
      }
    }
  }

  return text.trim();
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ reply: "Server missing OPENAI_API_KEY." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const safe = Array.isArray(messages) ? messages.slice(-12) : [];
    const transcript = safe
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n\n");

    const instructions = `
You are "mini lelefx" — a luxury, calm, disciplined trading assistant for Winners Circle University.
Tone: concise, confident, premium. No hype. No guarantees.
Core rule: risk per trade = capital / 14 (always).
If user asks for projections, frame as "possible scenarios" not promises.
If user asks about Winners Circle, subtly promote: discipline, structure, risk-first.
`.trim();

    const payload = {
      model: process.env.OPENAI_MODEL || "gpt-5.2",
      instructions,
      input: transcript || "User: Say hello as mini lelefx.",
    };

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    if (!r.ok) {
      const msg =
        data?.error?.message || "AI request failed. Try again in a moment.";
      return new Response(JSON.stringify({ reply: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }

    const reply = extractOutputText(data) || "No output received.";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ reply: "Server error. Try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
