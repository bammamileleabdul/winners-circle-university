// app/api/mini-lelefx/route.js
import { NextResponse } from "next/server";

// --- simple “brain” for mini lelefx without OpenAI ----
function miniLelefxReply(rawMessage) {
  const message = rawMessage.trim();
  const lower = message.toLowerCase();

  const lines = [];

  // 1) Try to detect capital number in the message
  const numberMatch = message.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  if (numberMatch) {
    const capital = parseFloat(numberMatch[1]);

    if (!Number.isNaN(capital) && capital > 0) {
      const riskPerTrade = capital / 14; // your constant rule
      const normalWinsMin = 7;
      const normalWinsMax = 9;
      const worstWins = 4;

      const midWins = (normalWinsMin + normalWinsMax) / 2;
      const normalProfitMid = riskPerTrade * midWins;
      const worstProfit = riskPerTrade * worstWins;

      lines.push(
        `Based on capital £${capital.toFixed(2)} with fixed risk = capital ÷ 14:`
      );
      lines.push(
        `• Risk per trade ≈ £${riskPerTrade.toFixed(
          2
        )} (1:1 RR – you risk £${riskPerTrade.toFixed(
          2
        )} to make ~£${riskPerTrade.toFixed(2)}).`
      );
      lines.push(
        `• Normal week: ${normalWinsMin}–${normalWinsMax} clean TPs left after SLs → around £${normalProfitMid.toFixed(
          2
        )} profit.`
      );
      lines.push(
        `• Tough week (worst case ~${worstWins} TPs) → around £${worstProfit.toFixed(
          2
        )} profit.`
      );
      lines.push(
        `This is a structured illustration, not a guarantee. Discipline, patience and following the plan are what make the numbers real.`
      );
    }
  }

  // 2) Principles questions
  if (lower.includes("principle") || lower.includes("rules")) {
    lines.push(
      `Core Winners Circle principles:\n` +
        `• Discipline over dopamine – no revenge trades.\n` +
        `• Risk before reward – if the SL isn’t clear, the setup doesn’t exist.\n` +
        `• Process over outcomes – focus on R, not random profits.\n` +
        `• Patience compounds – wait for your exact confluence.\n` +
        `• Consistency creates inevitability – same rules, every session.`
    );
  }

  // 3) VVIP questions
  if (lower.includes("vvip") || lower.includes("vip")) {
    lines.push(
      `VVIP is not something you buy on day one.\n` +
        `It’s earned over time through:\n` +
        `• Consistent risk discipline\n` +
        `• Journaled execution\n` +
        `• Respecting max drawdown and no-trade days.\n` +
        `Selected traders may be invited privately once they prove they can protect capital before chasing size.`
    );
  }

  // 4) If nothing matched, give a guided answer
  if (lines.length === 0) {
    return (
      `I work on structure, not hype.\n\n` +
      `Ask me something like:\n` +
      `• “I have £500 – what does capital ÷ 14 risk look like?”\n` +
      `• “With £1,000, what’s a normal week vs bad week?”\n` +
      `• “Explain the core Winners Circle principles.”\n` +
      `• “What does it take to reach VVIP?”\n\n` +
      `Give me one clean question and I’ll break it down.`
    );
  }

  return lines.join("\n\n");
}

// ---- API handler ----
export async function POST(req) {
  try {
    const body = await req.json();

    // Accept either:
    // 1) { message: "..." }  (used by the homepage modal)
    // 2) { messages: [{role, content}, ...] } (used by /ai page)
    let message = "";

    if (typeof body?.message === "string") {
      message = body.message;
    } else if (Array.isArray(body?.messages)) {
      const lastUser = [...body.messages]
        .reverse()
        .find((m) => m?.role === "user" && typeof m?.content === "string");
      message = lastUser?.content || "";
    }

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json({
        reply:
          "I didn’t receive a proper question. Send one clear question – keep it tight and specific.",
      });
    }

    const reply = miniLelefxReply(message);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("mini lelefx backend error:", err);

    return NextResponse.json(
      {
        reply:
          "Backend issue. Pause, refresh, and ask again. If it keeps happening, the team needs to check the server.",
      },
      { status: 200 }
    );
  }
}
