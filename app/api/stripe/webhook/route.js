import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature failed: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const user_id = session?.metadata?.user_id || null;
      const pairing_code = session?.metadata?.pairing_code || null;
      const week_start_ms = session?.metadata?.week_start_ms || null;

      const amount_total = session.amount_total ?? 0; // pence
      const amount_gbp = Number(amount_total) / 100;

      const { error } = await supabase.from("stripe_payments").upsert(
        {
          stripe_session_id: session.id,
          user_id,
          pairing_code,
          amount_gbp,
          currency: session.currency,
          payment_status: session.payment_status,
          week_start_ms: week_start_ms ? Number(week_start_ms) : null,
          paid_at: new Date().toISOString(),
        },
        { onConflict: "stripe_session_id" }
      );

      if (error) console.log("[stripe_payments] insert error:", error);
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.log("Webhook handler error:", e);
    return NextResponse.json({ error: e?.message || "Webhook handler error" }, { status: 500 });
  }
}
