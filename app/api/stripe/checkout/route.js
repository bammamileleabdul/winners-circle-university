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
    const amountPence = Number(body?.amount_pence);
    const currency = (body?.currency || "gbp").toLowerCase();

    if (!Number.isFinite(amountPence) || amountPence < 50) {
      return NextResponse.json({ error: "amount_pence must be >= 50" }, { status: 400 });
    }
    if (!["gbp"].includes(currency)) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
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
        week_start_iso: body?.week_start_iso ? String(body.week_start_iso) : "",
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
