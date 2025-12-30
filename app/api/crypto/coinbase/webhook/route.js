export const runtime = "nodejs";

import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function verifySignature(rawBody, signature, secret) {
  const computed = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  return computed === signature;
}

export async function POST(req) {
  const secret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Missing COINBASE_COMMERCE_WEBHOOK_SECRET" }, { status: 500 });
  }

  // Coinbase signs the RAW payload with HMAC SHA256 in X-CC-Webhook-Signature :contentReference[oaicite:5]{index=5}
  const signature = req.headers.get("x-cc-webhook-signature") || "";
  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Typical: event.type like charge:created / charge:confirmed / charge:failed
  const type = event?.event?.type;
  const charge = event?.event?.data;

  // OPTIONAL: store to Supabase
  // You can create a table "payments" later. For now we just return ok.
  // If you already have a payments table, tell me its columns and I’ll wire it perfectly.

  return Response.json({ ok: true, received: true, type });
}
