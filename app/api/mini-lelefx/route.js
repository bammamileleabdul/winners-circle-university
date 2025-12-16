// app/api/mini-lelefx/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({
        reply:
          "I didn’t receive a clear question. Ask me one thing at a time — for example: ‘Explain capital ÷ 14 risk with $1400.’",
      });
    }

    const lower = message.toLowerCase();

    // --- 1) Detect a capital amount like 1400, 1,400, 1400.50 ---
    const numMatch = message.match(/(\d[\d,]*(?:\.\d+)?)/);
    let capital = null;
    if (numMatch) {
      capital = parseFloat(numMatch[1].replace(/,/g, ""));
    }

    // helper to format dollars
    const fmt = (n) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    // --- 2) Capital ÷ 14 risk logic ---
    if (
      capital &&
      (lower.includes("÷ 14") ||
        lower.includes("/ 14") ||
        lower.includes("divide") ||
        lower.includes("risk per trade") ||
        lower.includes("risk with"))
    ) {
      const riskPerTrade = capital / 14;

      const reply = [
        "Here’s your capital ÷ 14 breakdown:",
        "",
        `• Starting capital: $${fmt(capital)}`,
        "• Risk rule: capital ÷ 14",
        `• Risk per trade: ~ $${fmt(riskPerTrade)}`,
        "",
        "This is the **maximum you’re prepared to lose per full stop-loss**, not your lot size.",
        "You still size the lot so that if SL is hit, the loss ≈ that risk amount.",
        "",
        "Remember: this is process, not financial advice."
      ].join("\n");

      return NextResponse.json({ reply });
    }

    // --- 3) VVIP questions ---
    if (lower.includes("vvip")) {
      const reply = [
        "VVIP in Winners Circle is not something you buy.",
        "",
        "It’s earned through:",
        "• Consistent execution of the framework",
        "• Respecting the capital ÷ 14 risk rule",
        "• Demonstrated discipline over dopamine",
        "• Showing up over time, not just during hype phases",
        "",
        "Some traders may be contacted quietly for deeper access when their behaviour matches the standard.",
      ].join("\n");

      return NextResponse.json({ reply });
    }

    // --- 4) Principles / rules questions ---
    if (
      lower.includes("principles") ||
      lower.includes("rules") ||
      lower.includes("framework")
    ) {
      const reply = [
        "Core Winners Circle principles:",
        "",
        "1) Discipline over dopamine – calm execution beats emotional clicks.",
        "2) Risk before reward – if protection isn’t clear, the trade doesn’t exist.",
        "3) Process over outcomes – judge decisions, not one single result.",
        "4) Patience compounds – fewer, higher-quality trades over noise.",
        "5) Consistency creates inevitability – repeat what works, cut what doesn’t.",
        "",
        "Mini lelefx exists to keep you inside this structure every time you ask something.",
      ].join("\n");

      return NextResponse.json({ reply });
    }

    // --- 5) Generic coaching reply (fallback) ---
    const reply = [
      "I’ve read your message:",
      `"${message}"`,
      "",
      "Here’s how to keep it inside Winners Circle process:",
      "• Stay inside the capital ÷ 14 risk rule.",
      "• Only act when structure + confirmation are clear.",
      "• Write your idea as a simple plan: entry, SL, TP, reason.",
      "",
      "If you want a calculation, ask like:",
      "“Explain capital ÷ 14 risk with $1000.”",
    ].join("\n");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("mini-lelefx error:", err);
    return NextResponse.json({
      reply:
        "Backend issue. Pause, refresh, and try again. If it keeps happening, come back later — process first, tech second.",
    });
  }
}
