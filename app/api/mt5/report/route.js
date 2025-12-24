import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ingestSecret = process.env.WCU_INGEST_SECRET;

const admin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

export async function POST(req) {
  try {
    const secret = req.headers.get("x-wcu-secret") || "";
    if (!ingestSecret || secret !== ingestSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { pairing_code, type } = body || {};
    if (!pairing_code) {
      return NextResponse.json({ error: "pairing_code required" }, { status: 400 });
    }

    const { data: conn, error: connErr } = await admin
      .from("mt5_connections")
      .select("user_id")
      .eq("pairing_code", pairing_code)
      .maybeSingle();

    if (connErr) throw connErr;
    if (!conn) return NextResponse.json({ error: "Invalid pairing_code" }, { status: 404 });

    const mt5_login = body.mt5_login ? String(body.mt5_login) : null;

    await admin
      .from("mt5_connections")
      .update({
        status: "connected",
        mt5_login,
        last_seen_at: new Date().toISOString(),
      })
      .eq("user_id", conn.user_id);

    if (type === "snapshot") {
      const { balance, equity, margin, free_margin } = body;
      const { error } = await admin.from("mt5_snapshots").insert({
        user_id: conn.user_id,
        mt5_login,
        balance,
        equity,
        margin,
        free_margin,
      });
      if (error) throw error;
    }

    if (type === "trade") {
      const {
        ticket,
        symbol,
        side,
        volume,
        open_time,
        close_time,
        profit,
        swap,
        commission,
      } = body;

      const { error } = await admin.from("mt5_trade_events").insert({
        user_id: conn.user_id,
        ticket: ticket ? String(ticket) : null,
        symbol,
        side,
        volume,
        open_time,
        close_time,
        profit,
        swap,
        commission,
      });
      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

