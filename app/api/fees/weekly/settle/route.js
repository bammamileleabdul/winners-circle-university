import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function envUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
}
function serviceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}
function admins() {
  return (process.env.WCU_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function getWeekStartUTC(d = new Date()) {
  // Monday 00:00 UTC (works fine for London winter; later we can make DST-proof if needed)
  const dt = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = dt.getUTCDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? 6 : day - 1); // days since Monday
  dt.setUTCDate(dt.getUTCDate() - diff);
  return dt; // Monday
}
function addDaysUTC(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}
function toISODateUTC(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function POST(req) {
  try {
    const url = envUrl();
    const key = serviceKey();
    if (!url) return NextResponse.json({ error: "SUPABASE_URL missing" }, { status: 500 });
    if (!key) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY missing" }, { status: 500 });

    const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = createClient(url, key, { auth: { persistSession: false } });

    const { data: uData, error: uErr } = await sb.auth.getUser(token);
    if (uErr || !uData?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const email = (uData.user.email || "").toLowerCase();
    if (!admins().includes(email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const userId = body.user_id || uData.user.id;

    const ws = getWeekStartUTC(new Date());
    const we = addDaysUTC(ws, 6);
    const week_start = toISODateUTC(ws);
    const week_end = toISODateUTC(we);

    // Fetch weekly record
    const { data: row, error: rErr } = await sb
      .from("mt5_weekly_pnl")
      .select("*")
      .eq("user_id", userId)
      .eq("week_start", week_start)
      .maybeSingle();

    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 400 });
    if (!row) return NextResponse.json({ error: "No weekly PnL found yet (bot hasn’t reported it)" }, { status: 400 });
    if (row.settled) return NextResponse.json({ error: "Already settled this week" }, { status: 400 });

    const nowIso = new Date().toISOString();

    const { error: upErr } = await sb
      .from("mt5_weekly_pnl")
      .update({ settled: true, settled_at: nowIso, updated_at: nowIso })
      .eq("id", row.id);

    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

    return NextResponse.json({ ok: true, week_start, week_end, fee_paid: row.fee_due });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
