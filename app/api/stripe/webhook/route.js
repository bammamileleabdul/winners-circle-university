import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY || "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    if (!secretKey) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    if (!webhookSecret) return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Missing Supabase server env vars" }, { status: 500 });
    }

    const sig = req.headers.get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });

    // MUST be raw text for Stripe signature verification
    const rawBody = await req.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      return NextResponse.json({ error: `Webhook signature failed: ${err?.message || "bad signature"}` }, { status: 400 });
    }

    // Only handle what we need
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const user_id = session?.metadata?.user_id || null;
      const kind = session?.metadata?.kind || null;
      const week_start_iso = session?.metadata?.week_start_iso || null;

      const amount_pence = Number(session?.amount_total || 0);
      const currency = (session?.currency || "gbp").toLowerCase();
      const status = session?.payment_status || "unknown";

      const stripe_session_id = session?.id || null;
      const stripe_payment_intent =
        typeof session?.payment_intent === "string" ? session.payment_intent : null;

      const email =
        session?.customer_details?.email ||
        session?.customer_email ||
        null;

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Upsert so webhook re-tries don't duplicate
      const { error } = await supabase
        .from("payments")
        .upsert(
          {
            user_id,
            email,
            amount_pence,
            currency,
            status: status === "paid" ? "paid" : status,
            kind,
            week_start_iso,
            stripe_session_id,
            stripe_payment_intent,
          },
          { onConflict: "stripe_session_id" }
        );

      if (error) {
        return NextResponse.json({ error: `DB write failed: ${error.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Webhook error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 });
}
