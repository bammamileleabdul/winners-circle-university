import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/checkout
 * Body: { pairing_code: string, amount_gbp: number, week_start_ms?: number }
 * Auth: Authorization: Bearer <supabase access_token>
 */
export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Supabase service key not configured" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const pairing_code = String(body.pairing_code || "").trim();
    const amount_gbp = Number(body.amount_gbp);
    const week_start_ms =
      body.week_start_ms != null ? Number(body.week_start_ms) : null;

    if (!pairing_code) {
      return NextResponse.json({ error: "pairing_code required" }, { status: 400 });
    }
    if (!Number.isFinite(amount_gbp) || amount_gbp <= 0) {
      return NextResponse.json({ error: "amount_gbp must be > 0" }, { status: 400 });
    }

    // Stripe requires integer minor units (pence)
    const amount_pence = Math.round(amount_gbp * 100);
    if (amount_pence < 50) {
      return NextResponse.json({ error: "Minimum amount is £0.50" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Validate the user token
    const { data: userRes, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = userRes.user;

    // Make sure this pairing_code belongs to this user
    const { data: conn, error: connErr } = await supabase
      .from("mt5_connections")
      .select("id, pairing_code, user_id, mt5_login")
      .eq("user_id", user.id)
      .eq("pairing_code", pairing_code)
      .maybeSingle();

    if (connErr) return NextResponse.json({ error: connErr.message }, { status: 500 });
    if (!conn) return NextResponse.json({ error: "Pairing not found for this user" }, { status: 404 });

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://winners-circle-university.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "WCU Weekly Profit Share (30%)",
              description: `Pairing ${pairing_code}${conn.mt5_login ? ` • MT5 ${conn.mt5_login}` : ""}`,
            },
            unit_amount: amount_pence,
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
        pairing_code,
        week_start_ms: week_start_ms != null && Number.isFinite(week_start_ms) ? String(week_start_ms) : "",
        amount_gbp: String(amount_gbp.toFixed(2)),
        kind: "weekly_profit_share",
      },
      success_url: `${origin}/client-portal?paid=1`,
      cancel_url: `${origin}/client-portal?paid=0`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

