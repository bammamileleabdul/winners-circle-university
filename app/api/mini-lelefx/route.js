// app/api/mini-lelefx/route.js
import { NextResponse } from "next/server";
import { SITE } from "../../../lib/site";

// Rules-based "brain" for mini lelefx (no external AI). It explains how things work;
// it never forecasts profits.
function miniLelefxReply(rawMessage) {
  const message = rawMessage.trim();
  const lower = message.toLowerCase();
  const lines = [];
  const fee = SITE.performanceFeePct;

  if (/(copy|exness|social|start|join|sign ?up|connect|how.*work)/.test(lower)) {
    lines.push(
      `How copying works:\n` +
        `• Open an Exness account and verify it.\n` +
        `• In the Exness Social Trading app, find the Winners Circle strategy and press Invest.\n` +
        `• Choose how much to invest (from $${SITE.minInvestmentUsd}). Trades then copy automatically in proportion to your investment.\n` +
        `• You can stop copying or withdraw from the app at any time.\n` +
        `We never ask for your password and never hold your money.`
    );
  }

  if (/(fee|30|pay|charge|cost|price)/.test(lower)) {
    lines.push(
      `The fee:\n` +
        `• ${fee}% of new profit only, set on the strategy inside Exness.\n` +
        `• Exness calculates it at the end of each monthly period and deducts it from the profit in your investment.\n` +
        `• High-water mark: after a losing stretch, no fee is charged until your investment is back above its previous peak.\n` +
        `• No profit means no fee. You never send money to us directly.`
    );
  }

  const num = message.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  if (num && /(risk|capital|\$|£|invest|have)/.test(lower)) {
    const capital = parseFloat(num[1]);
    if (capital > 0) {
      const perTrade = capital / 14;
      lines.push(
        `Risk structure on ${capital.toFixed(2)}:\n` +
          `• The framework caps risk per trade at capital ÷ 14 ≈ ${perTrade.toFixed(2)}.\n` +
          `• Trades are planned at 1:1 reward to risk.\n` +
          `• A run of losses reduces the balance, so size stays proportional.\n` +
          `I don’t forecast profits. To see how the strategy’s past results would have played out, open the Simulator.`
      );
    }
  }

  if (lower.includes("principle") || lower.includes("rules")) {
    lines.push(
      `Core Winners Circle principles:\n` +
        `• Discipline over dopamine: no revenge trades.\n` +
        `• Risk before reward: if the stop isn’t clear, the setup doesn’t exist.\n` +
        `• Process over outcomes: judge decisions, not single results.\n` +
        `• Patience compounds: wait for your exact confluence.\n` +
        `• Consistency creates inevitability: same rules, every session.`
    );
  }

  if (lower.includes("vvip") || lower.includes("vip")) {
    lines.push(
      `VVIP is not something you buy on day one.\n` +
        `It’s earned over time through consistent risk discipline, journaled execution and respect for drawdown limits.\n` +
        `Selected members may be invited privately.`
    );
  }

  if (/(guarantee|safe|lose|risk)/.test(lower) && !lines.length) {
    lines.push(
      `Straight answer: there are no guarantees. Forex and CFDs are high risk and you can lose the money you invest, including when copying. Only invest what you can afford to lose.`
    );
  }

  if (lines.length === 0) {
    return (
      `I work on structure, not hype.\n\n` +
      `Ask me something like:\n` +
      `• “How does copying through Exness work?”\n` +
      `• “How is the ${fee}% fee charged?”\n` +
      `• “What’s the risk per trade on 500?”\n` +
      `• “Explain the principles.”\n` +
      `• “What does it take to reach VVIP?”`
    );
  }

  return lines.join("\n\n");
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Accept { message } (floating assistant) or { messages: [...] } (/ai page)
    let message = "";
    if (typeof body?.message === "string") {
      message = body.message;
    } else if (Array.isArray(body?.messages)) {
      const lastUser = [...body.messages].reverse().find((m) => m?.role === "user" && typeof m?.content === "string");
      message = lastUser?.content || "";
    }

    if (!message || message.trim().length < 3) {
      return NextResponse.json({ reply: "Send one clear question. Keep it tight and specific." });
    }

    return NextResponse.json({ reply: miniLelefxReply(message) });
  } catch (err) {
    console.error("mini lelefx backend error:", err);
    return NextResponse.json({ reply: "Backend issue. Refresh and ask again." }, { status: 200 });
  }
}
