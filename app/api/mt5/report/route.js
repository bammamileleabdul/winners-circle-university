import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const pairing_code = String(body?.pairing_code || "").trim();
    const type = String(body?.type || "heartbeat").trim(); // heartbeat | trade_close
    const mt5_login = body?.mt5_login ? String(body.mt5_login) : null;

    if (!pairing_code || pairing_code.length < 6) {
      return NextResponse.json({ error: "Missing pairing_code" }, { status: 400 });
    }

    const { data: conn, error: connErr } = await supabaseAdmin
      .from("mt5_connections")
      .select("user_id, mt5_login")
      .eq("pairing_code", pairing_code)
      .maybeSingle();

    if (connErr) return NextResponse.json({ error: connErr.message }, { status: 500 });
    if (!conn) return NextResponse.json({ error: "Invalid pairing code" }, { status: 401 });

    const patch = {
      last_seen_at: new Date().toISOString(),
      status: "connected",
    };
    if (mt5_login && !conn.mt5_login) patch.mt5_login = mt5_login;

    await supabaseAdmin.from("mt5_connections").update(patch).eq("user_id", conn.user_id);

    if (type === "trade_close") {
      const ticket = Number(body?.ticket);
      if (!Number.isFinite(ticket)) {
        return NextResponse.json({ error: "Missing/invalid ticket" }, { status: 400 });
      }

      const payload = {
        user_id: conn.user_id,
        mt5_login: mt5_login || conn.mt5_login || null,
        ticket,
        symbol: body?.symbol ? String(body.symbol) : null,
        volume: body?.volume ?? null,
        profit: body?.profit ?? null,
        swap: body?.swap ?? null,
        commission: body?.commission ?? null,
        closed_at: body?.closed_at ? String(body.closed_at) : null,
      };

      const { error: insErr } = await supabaseAdmin
        .from("mt5_trade_events")
        .upsert(payload, { onConflict: "user_id,ticket" });

      if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
