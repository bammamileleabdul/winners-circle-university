// app/api/cdp/webhook/route.js
import crypto from "crypto";

/**
 * Coinbase CDP Webhooks signature verification
 * Docs: "X-Hook0-Signature: t=...,h=...,v1=..."
 */
function verifyWebhookSignature(rawBody, signatureHeader, secret, headersObj, maxAgeMinutes = 5) {
  try {
    if (!signatureHeader || !secret) return false;

    // Parse signature header
    // Format: t=1728394718,h=content-type x-hook0-id,v1=abcdef...
    const parts = signatureHeader.split(",").map((s) => s.trim());
    const tPart = parts.find((p) => p.startsWith("t="));
    const hPart = parts.find((p) => p.startsWith("h="));
    const v1Part = parts.find((p) => p.startsWith("v1="));

    if (!tPart || !hPart || !v1Part) return false;

    const timestamp = tPart.split("=")[1];
    const headerNames = hPart.split("=")[1]; // e.g. "content-type x-hook0-id"
    const providedSignature = v1Part.split("=")[1];

    // Replay protection
    const webhookTime = parseInt(timestamp, 10) * 1000;
    const ageMinutes = (Date.now() - webhookTime) / (1000 * 60);
    if (!Number.isFinite(ageMinutes) || ageMinutes > maxAgeMinutes) return false;

    // Build headerValues string in the exact order listed in `h=`
    const headerNameList = headerNames.split(" ").filter(Boolean);
    const headerValues = headerNameList
      .map((name) => {
        // CDP signs lower-case header names, Next gives us case-insensitive access
        const v = headersObj[name.toLowerCase()] ?? "";
        return String(v);
      })
      .join(".");

    // Build signed payload: `${timestamp}.${headerNames}.${headerValues}.${rawBody}`
    const signedPayload = `${timestamp}.${headerNames}.${headerValues}.${rawBody}`;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signedPayload, "utf8")
      .digest("hex");

    // timing-safe compare
    const a = Buffer.from(expectedSignature, "hex");
    const b = Buffer.from(providedSignature, "hex");
    if (a.length !== b.length) return false;

    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req) {
  // IMPORTANT: keep raw body exactly (don’t do req.json() before verifying)
  const rawBody = await req.text();

  // Build a plain headers object (lowercased keys)
  const headersObj = {};
  for (const [k, v] of req.headers.entries()) headersObj[k.toLowerCase()] = v;

  const signature = headersObj["x-hook0-signature"];
  const secret = process.env.CDP_WEBHOOK_SECRET;

  const ok = verifyWebhookSignature(rawBody, signature, secret, headersObj, 5);
  if (!ok) {
    return new Response("Invalid signature", { status: 400 });
  }

  // Only parse AFTER verification
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  // ✅ At this point the webhook is authentic.
  // TODO: your business logic here:
  // - check event.type (example: "onchain.activity.detected")
  // - check event.data.to equals your deposit address
  // - store to Supabase "payments" table
  // - mark invoice as paid

  console.log("[CDP] webhook verified ✅", {
    id: event?.id,
    type: event?.type,
    createdAt: event?.createdAt,
  });

  return new Response("OK", { status: 200 });
}

// Optional: respond to GET so browser doesn't show a scary error if you visit the URL
export async function GET() {
  return new Response("CDP webhook endpoint. Use POST.", { status: 200 });
}
