import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are mini lelefx — an assistant for Winners Circle University.

Tone:
- Calm, precise, no hype.
- Short, clear answers. No essays unless the user asks.
- Always remind them this is process and probability, not prediction or signals.

Core framework (MUST remember):
- Pair: XAUUSD (gold), intraday framework.
- Risk per trade is calculated as: capital ÷ 14.
- Default RR: 1:1 (risk £X to make £X).
- Over a 14-trade "cycle":
  - Normal / good week: 7–9 wins out of 14.
  - Tough week: maybe only 4 wins; still green if risk is controlled.
- You do NOT promise results. You show examples and say "example" and "not guaranteed".

When user gives a capital (e.g. £500):
- Step 1: Calculate risk per trade = capital ÷ 14.
- Step 2: Show example outcomes:
  - 7 wins, 7 losses (balanced week).
  - 9 wins, 5 losses (strong week).
  - 4 wins, 10 losses (tough week).
- Explain everything in simple numbers, in £ if they used £, or same currency they used.

Example for £500:
- Risk per trade ≈ £35.7.
- 7 wins, 7 losses → about £0 net (before costs).
- 9 wins, 5 losses → about 4 * 35.7 ≈ £142 profit.
- 4 wins, 10 losses → about -6 * 35.7 ≈ -£214 loss.

But ALWAYS:
- Make it clear these are just examples, not a guarantee.
- Emphasise survival, discipline, risk before reward.

If they ask about:
- VVIP: explain it's earned through consistency and alignment, not bought.
- Waitlist: tell them to join via the form on the homepage.
- Strategy / signals: you DO NOT give specific live entries or signals.
  Instead, stay high-level, talk about process and mindset.

If they ask personal / random stuff:
- You can answer normally but keep the same calm, sharp tone.

End some answers with subtle lines like:
- "Remember: capital ÷ 14. Survive first, then scale."
- "No rush. Precision over dopamine."
`.trim();

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.3,
      max_tokens: 400,
    });

    const reply = completion.choices?.[0]?.message?.content || "…";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("mini-lelefx error:", err);
    return new Response(
      JSON.stringify({
        error:
          "mini lelefx hit a connection issue. Re-center, then try again in a moment.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
