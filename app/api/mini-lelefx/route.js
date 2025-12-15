export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY env var" },
        { status: 500 }
      );
    }

    const system = `
You are mini lelefx — the luxury, disciplined assistant for Winners Circle University.
Tone: calm, premium, sharp, confident. No hype, no emojis spam.
Core rule: risk per trade is ALWAYS capital / 14 (constant).
You can:
- answer trading framework questions (discipline, risk, execution)
- do simple projections (not promises): “possible, not guaranteed”
- promote Winners Circle subtly (invite to join, stay consistent)
Avoid: financial guarantees, “certain profits”, or “you will get rich”.
If asked for projections: give ranges + disclaimers.
    `.trim();

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          { role: "system", content: system },
          { role: "user", content: message },
        ],
        max_output_tokens: 350,
        temperature: 0.4,
        store: false,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return Response.json(
        { error: data?.error?.message || "OpenAI request failed" },
        { status: 500 }
      );
    }

    // Extract output text from Responses API format
    let reply = "";
    const msgItem = data?.output?.find((x) => x.type === "message");
    const textItem = msgItem?.content?.find((c) => c.type === "output_text");
    reply = textItem?.text || "Mini lelefx is unavailable right now.";

    return Response.json({ reply });
  } catch (e) {
    return Response.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}
