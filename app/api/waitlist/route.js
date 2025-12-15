export async function POST(req) {
  try {
    const body = await req.json();
    const email = body?.email;

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Send to Formspree (no redirect, server-to-server)
    const formspreeUrl = "https://formspree.io/f/xpwveaza";

    const res = await fetch(formspreeUrl, {
      method: "POST",
      headers: { Accept:
