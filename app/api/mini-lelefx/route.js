// app/api/mini-lelefx/route.js

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    // If the key isn't available on the server
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = (body?.message || "").toString().trim();

    // If the frontend didn’t send a message
    if (!message) {
      return NextResponse.json(
        { error: "I didn’t receive a proper question. Try again." },
        { status: 400 }
      );
    }

    // Call OpenAI
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // safe, widely available model
          messages: [
            {
              role: "system",
              content:
                "You are mini lelefx, an assistant for Winners Circle University. " +
                "You talk calm and precise. You never promise profits. " +
                "You explain risk as capital ÷ 14, position sizing, patience, and discipline. " +
                "If asked for exact signals, you remind them this is not financial advice.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 400,
          temperature: 0.6,
        }),
      }
    );

    const data = await response.json();

    // If OpenAI returned an error
    if (!response.ok) {
      console.error("OpenAI error:", data);
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Backend issue talking to OpenAI. Try again later.",
        },
        { status: 500 }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I processed that, but didn’t get a clear response. Ask again another way.";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("mini-lelefx route error:", err);
    return NextResponse.json(
      { error: "Server error. Pause, refresh, and try again." },
      { status: 500 }
    );
  }
}
