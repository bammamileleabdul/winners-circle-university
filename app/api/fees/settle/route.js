import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getEnvUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
}

function getServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function parseAdminEmails() {
  return (process.env.WCU_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function POST(req) {
  try {
    const url = getEnvUrl();
    const serviceKey = getServiceKey();
    if (!url) return NextResponse.json({ error: "SUPABASE_URL missing" }, { status: 500 });
    if (!serviceKey) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY missing" }, { status: 500 });

    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

    // verify user from JWT
    const { data: uData, error: uErr } = await supabase.auth.getUser(token);
    if (uErr || !uData?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const email = (uData.user.email || "").toLowerCase();
    const admins = parseAdminEmails();
    if (!admins.includes(email)) {
      return NextResponse.json({ error: "Forbidden (admin only)" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const targetUserId = body.user_id || uData.user.id;

    // latest snapshot
    const { data: latest, error: lErr } = await supabase
      .from("mt5_snapshots")
      .select("equity,created_at")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lErr) return NextResponse.json({ error: lErr.message }, { status: 400 });
    if (!latest) return NextResponse.json({ error: "No snapshots for this user yet" }, { status: 400 });

    const currentEquity = Number(latest.equity);
    if (!Number.isFinite(currentEquity)) {
      return NextResponse.json({ error: "Invalid equity" }, { status: 400 });
    }

    // existing fee state
    const { data: st } = await supabase
      .from("mt5_fee_state")
      .select("paid_hwm")
      .eq("user_id", targetUserId)
      .maybeSingle();

    let paid = st?.paid_hwm;
    let paidHwm = Number(paid);
    if (!Number.isFinite(paidHwm)) {
      // initialize paid watermark to FIRST snapshot equity/balance
      const { data: first } = await supabase
        .from("mt5_snapshots")
        .select("equity,balance,created_at")
        .eq("user_id", targetUserId)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      const base = Number(first?.equity ?? first?.balance ?? currentEquity);
      paidHwm = Number.isFinite(base) ? base : currentEquity;
    }

    const feeDue = Math.max(0, currentEquity - paidHwm) * 0.3;
    const newPaidHwm = Math.max(paidHwm, currentEquity);

    const nowIso = new Date().toISOString();

    const { error: upErr } = await supabase
      .from("mt5_fee_state")
      .upsert(
        {
          user_id: targetUserId,
          paid_hwm: newPaidHwm,
          last_fee_paid: feeDue,
          last_paid_at: nowIso,
          updated_at: nowIso,
        },
        { onConflict: "user_id" }
      );

    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

    return NextResponse.json({
      ok: true,
      targetUserId,
      paid_hwm_before: paidHwm,
      paid_hwm_after: newPaidHwm,
      fee_paid: feeDue,
      settled_at: nowIso,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
