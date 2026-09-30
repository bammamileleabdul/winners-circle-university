import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

function getOrigin(req) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://winners-circle-university.vercel.app"
  );
}

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Missing Supabase server env vars" }, { status: 500 });
    }

    // Require logged-in user (Supabase JWT)
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    const user = userData?.user;
    if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const currency = "gbp";

    // The fee is worked out here on the server from the account's own snapshots.
    // Whatever amount the browser sends is ignored, so it can't be edited to pay less.
    const weekStart = new Date(body?.week_start_iso || "");
    const now = Date.now();
    if (Number.isNaN(weekStart.getTime()) || weekStart.getTime() > now || now - weekStart.getTime() > 8 * 24 * 3600 * 1000) {
      return NextResponse.json({ error: "Invalid week_start_iso" }, { status: 400 });
    }
    const week_start_iso = weekStart.toISOString();

    const { data: ws, error: wsErr } = await supabase
      .from("mt5_snapshots")
      .select("equity")
      .eq("user_id", user.id)
      .gte("created_at", week_start_iso)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (wsErr) return NextResponse.json({ error: wsErr.message }, { status: 400 });

    const { data: latest, error: lErr } = await supabase
      .from("mt5_snapshots")
      .select("equity")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (lErr) return NextResponse.json({ error: lErr.message }, { status: 400 });

    const startEq = Number(ws?.equity);
    const curEq = Number(latest?.equity);
    if (!Number.isFinite(startEq) || !Number.isFinite(curEq)) {
      return NextResponse.json({ error: "No account data for this week yet" }, { status: 400 });
    }

    const amountPence = Math.round(Math.max(0, curEq - startEq) * 0.3 * 100);
    if (amountPence < 50) {
      return NextResponse.json({ error: "No fee due this week" }, { status: 400 });
    }

    // Don't take a second payment for a week that's already paid.
    const { data: paid } = await supabase
      .from("payments")
      .select("id")
      .eq("user_id", user.id)
      .eq("week_start_iso", week_start_iso)
      .eq("status", "paid")
      .limit(1);
    if (paid && paid.length) {
      return NextResponse.json({ error: "This week's fee is already paid" }, { status: 409 });
    }

    const origin = getOrigin(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: Math.round(amountPence),
            product_data: {
              name: "WCU Weekly Profit Share (30%)",
              description: "Weekly profit share settlement",
            },
          },
        },
      ],
      success_url: `${origin}/client-portal?paid=1`,
      cancel_url: `${origin}/client-portal?canceled=1`,
      metadata: {
        kind: String(body?.kind || "weekly_profit_share"),
        user_id: user.id,
        mt5_login: body?.mt5_login ? String(body.mt5_login) : "",
        pairing_code: body?.pairing_code ? String(body.pairing_code) : "",
        week_start_iso,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Checkout error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 });
}
