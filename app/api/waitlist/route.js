import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, source } = await req.json();

    const formspreeUrl =
      process.env.FORMSPREE_URL || "https://formspree.io/f/xpwveaza";

    const form = new FormData();
    form.append("email", email || "");
    form.append("source", source || "Winners Circle Landing Page");

    const res = await fetch(formspreeUrl, {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Form submit failed", details: text },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", details: String(e) },
      { status: 500 }
    );
  }
}
