// app/api/mini-lelefx/route.js

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const rawMessage = body?.message || "";

    if (!rawMessage || typeof rawMessage !== "string") {
      return NextResponse.json({
        reply:
          "I didn’t receive a clear question. Ask me about risk (capital ÷ 14), VVIP philosophy, or discipline."
      });
    }

    const message = rawMessage.trim();
    const lower = message.toLowerCase();

    let reply = "";

    // --- 1) Capital ÷ 14 risk calc demo ---
    // Try to find a number in the text (like 1400, 500, 2000 etc.)
    const numMatch = message.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
    const capital = numMatch ? parseFloat(numMatch[1]) : null;

    const looksLikeRiskQuestion =
      lower.includes("capital") ||
      lower.includes("risk") ||
      lower.includes("÷ 14") ||
      lower.includes("/14") ||
      lower.includes("per trade");

    if (looksLikeRiskQuestion && capital && !Number.isNaN(capital)) {
      const riskPerTrade = capital / 14;
      const riskRounded = Math.round(riskPerTrade * 100) / 100;

      reply =
        `Using capital ÷ 14:\n\n` +
        `• Capital: $${capital.toLocaleString()}\n` +
        `• Risk per trade: ~$${riskRounded.toLocaleString()}\n\n` +
        `Same rule every time: protect capital first. No revenge trades, no doubling risk.`;
    }

    // --- 2) VVIP / principles questions ---
    else if (lower.includes("vvip")) {
      reply =
        "VVIP isn’t bought, it’s earned.\n\n" +
        "Consistency, discipline and clean execution over a long period. " +
        "No gambling, no chaos — just structured performance.";
    } else if (
      lower.includes("discipline") ||
      lower.includes("rules") ||
      lower.includes("process")
    ) {
      reply =
        "mini lelefx answer: process over outcomes.\n\n" +
        "You control risk, structure, and execution. The market controls outcome. " +
        "Your job is to show up with the same clean process every session.";
    }

    // --- 3) Greetings / small talk ---
    else if (
      lower.startsWith("hi") ||
      lower.startsWith("hey") ||
      lower.startsWith("hello")
    ) {
      reply =
        "Calm. I’m here.\n\nAsk me for a risk breakdown (capital ÷ 14), VVIP criteria, " +
        "or a reminder of Winners Circle principles.";
    }

    // --- 4) Fallback generic reply ---
    else {
      reply =
        "I’m in demo mode right now.\n\n" +
        "I can help you with:\n" +
        "• Risk examples using capital ÷ 14\n" +
        "• VVIP philosophy\n" +
        "• Discipline / process reminders\n\n" +
        "Try something like: “Explain capital ÷ 14 risk with $1400 and give the risk per trade.”";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("mini-lelefx demo error:", err);
    return NextResponse.json(
      {
        reply:
          "Backend glitch. Refresh the page and try again, keeping the question simple."
      },
      { status: 200 }
    );
  }
}
