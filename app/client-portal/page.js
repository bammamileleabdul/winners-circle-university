"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

/* ---------- formatting helpers ---------- */
function fmtMoney(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  const v = Number(n);
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v);
  return `${sign}£${abs.toFixed(2)}`;
}
function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}
function agoLabel(iso) {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (!t) return "—";
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

function startOfWeekISO(now = new Date()) {
  // Week starts Monday 00:00 (local time)
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const daysSinceMonday = (day + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysSinceMonday);
  return d.toISOString();
}

/* ---------- tiny SVG chart ---------- */
function TinyLine({ data, height = 44 }) {
  const w = 240;
  const h = height;
  if (!data || data.length < 2) {
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="tinyChart">
        <path d={`M0 ${h / 2} L${w} ${h / 2}`} className="lineDim" />
      </svg>
    );
  }
  const ys = data.map((d) => d.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = maxY - minY || 1;
  const pad = span * 0.08;
  const lo = minY - pad;
  const hi = maxY + pad;

  const path = data
    .map((p, i) => {
      const x = (i / (data.length - 1)) * (w - 8) + 4;
      const y = h - ((p.y - lo) / (hi - lo)) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="tinyChart" aria-hidden="true">
      <path d={path} className="lineMain" />
    </svg>
  );
}

/* ---------- motivational quotes ---------- */
const QUOTES = [
  "Discipline beats motivation. Every single time.",
  "Consistency is what makes the account grow.",
  "Protect your capital like it’s your oxygen.",
  "Small wins compound into big results.",
  "Patience is a strategy, not a delay.",
  "No revenge trades. Only clean execution.",
  "Your edge is useless without risk control.",
  "Let the process pay you.",
  "One good week is built on many good decisions.",
];

/* ---------- main page ---------- */
export default function ClientPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // connection + snapshots
  const [conn, setConn] = useState(null);
  const [latest, setLatest] = useState(null);
  const [firstSnap, setFirstSnap] = useState(null);
  const [snapshots, setSnapshots] = useState([]);

  // weekly billing (start-of-week snapshot)
  const [weekStartSnap, setWeekStartSnap] = useState(null);
  const [payLoading, setPayLoading] = useState(false);

  // peak equity directly from mt5_snapshots (NO mt5_equity_peaks table)
  const [peakSnap, setPeakSnap] = useState(null);

  // equity series for mini chart
  const [equitySeries, setEquitySeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const [quote, setQuote] = useState(QUOTES[0]);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    // Stripe redirect feedback
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("paid") === "1") showToast("Payment received ✅");
      if (url.searchParams.get("canceled") === "1") showToast("Payment canceled");
    } catch {}
    // rotating quotes
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const t = setInterval(() => {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 25000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auth gate
  useEffect(() => {
    let mounted = true;
    const boot = async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data?.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
    };
    boot();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session?.user) router.push("/login");
      else setUser(session.user);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const payWithStripe = async () => {
    try {
      if (!weeklyFeeDue || weeklyFeeDue <= 0) {
        showToast("No fee due this week ✅");
        return;
      }
      setPayLoading(true);

      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount_pence: Math.round(Number(weeklyFeeDue) * 100),
          currency: "gbp",
          kind: "weekly_profit_share",
          week_start_iso: startOfWeekISO(new Date()),
          pairing_code: conn?.pairing_code || null,
          mt5_login: conn?.mt5_login || null,
        }),
      });

      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out?.error || "Checkout failed");
      if (out?.url) {
        window.location.href = out.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      showToast(e?.message || "Payment error");
    } finally {
      setPayLoading(false);
    }
  };

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // connection
      const { data: c, error: cErr } = await supabase
        .from("mt5_connections")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cErr) throw cErr;
      setConn(c || null);

      // latest snapshot
      const { data: l, error: lErr } = await supabase
        .from("mt5_snapshots")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lErr) throw lErr;
      setLatest(l || null);

      // first snapshot
      const { data: f, error: fErr } = await supabase
        .from("mt5_snapshots")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (fErr) throw fErr;
      setFirstSnap(f || null);

      // last 200 snapshots
      const { data: rec, error: rErr } = await supabase
        .from("mt5_snapshots")
        .select("created_at,equity,balance,margin,free_margin")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(200);
      if (rErr) throw rErr;
      setSnapshots(rec || []);

      // Week start snapshot (Monday 00:00 local)
      const weekStartIso = startOfWeekISO(new Date());
      const { data: ws, error: wsErr } = await supabase
        .from("mt5_snapshots")
        .select("equity,created_at")
        .eq("user_id", user.id)
        .gte("created_at", weekStartIso)
        .order("created_at", { ascending: true })
        .limit(1);
      if (wsErr) throw wsErr;
      setWeekStartSnap(ws?.[0] || null);

      // peak equity directly from mt5_snapshots (no extra tables)
      const { data: pk, error: pkErr } = await supabase
        .from("mt5_snapshots")
        .select("equity,created_at")
        .eq("user_id", user.id)
        .order("equity", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (pkErr) throw pkErr;
      setPeakSnap(pk || null);

      // equity series (for mini chart)
      const { data: series, error: sErr } = await supabase
        .from("mt5_snapshots")
        .select("created_at,equity")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(240);
      if (sErr) throw sErr;
      setEquitySeries(series || []);
    } catch (e) {
      showToast(e?.message || "Refresh failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    refresh();
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /* ---------- computed numbers ---------- */
  const startEquity = useMemo(() => {
    if (!firstSnap) return null;
    const v = firstSnap.equity ?? firstSnap.balance ?? null;
    return v === null ? null : Number(v);
  }, [firstSnap]);

  const currentEquity = useMemo(() => {
    if (!latest) return null;
    const v = latest.equity ?? latest.balance ?? null;
    return v === null ? null : Number(v);
  }, [latest]);

  const currentBalance = useMemo(() => {
    if (!latest) return null;
    const v = latest.balance ?? null;
    return v === null ? null : Number(v);
  }, [latest]);

  const sinceStartPL = useMemo(() => {
    if (startEquity === null || currentEquity === null) return null;
    return Number(currentEquity - startEquity);
  }, [startEquity, currentEquity]);

  // peak equity derived from snapshots
  const hwmEquity = useMemo(() => {
    const v = peakSnap?.equity;
    return v === null || v === undefined ? null : Number(v);
  }, [peakSnap]);

  const hwmDrawdownPct = useMemo(() => {
    if (hwmEquity === null || currentEquity === null) return null;
    if (hwmEquity <= 0) return 0;
    const dd = Math.max(0, (hwmEquity - currentEquity) / hwmEquity);
    return dd * 100;
  }, [hwmEquity, currentEquity]);

  // Weekly profit-share (30% of profits this week only)
  const weekStartIsoLabel = useMemo(() => startOfWeekISO(new Date()), []);
  const weekStartEquity = useMemo(() => {
    const v = weekStartSnap?.equity ?? startEquity;
    return v === null || v === undefined ? null : Number(v);
  }, [weekStartSnap, startEquity]);

  const weeklyPL = useMemo(() => {
    if (currentEquity === null || weekStartEquity === null) return null;
    return Number(currentEquity - weekStartEquity);
  }, [currentEquity, weekStartEquity]);

  const weeklyFeeDue = useMemo(() => {
    if (weeklyPL === null) return null;
    return Math.max(0, weeklyPL) * 0.3;
  }, [weeklyPL]);

  const weeklyClientKeeps = useMemo(() => {
    if (weeklyPL === null) return null;
    return Math.max(0, weeklyPL) * 0.7;
  }, [weeklyPL]);

  const chartData = useMemo(() => {
    if (!equitySeries || equitySeries.length < 2) return [];
    return equitySeries
      .filter((p) => p?.equity !== null && p?.equity !== undefined)
      .map((p, i) => ({ x: i, y: Number(p.equity) }));
  }, [equitySeries]);

  if (!user) {
    return (
      <div className="wrap">
        <div className="card">
          <div className="title">Client Portal</div>
          <div className="dim">Loading…</div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      <header className="topbar">
        <div className="brand">
          <div className="logo">WCU</div>
          <div className="stack">
            <div className="h1">Client Portal</div>
            <div className="dim small">MT5 snapshots • secure • live updates</div>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={refresh} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button className="btn ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {toast ? <div className="toast">{toast}</div> : null}

      <section className="hero">
        <div className="heroCard">
          <div className="heroTop">
            <div className="heroLeft">
              <div className="heroTitle">Your account snapshot</div>
              <div className="dim">
                Last update: <b>{latest?.created_at ? agoLabel(latest.created_at) : "—"}</b>
                {latest?.created_at ? <span className="dim"> • {fmtTime(latest.created_at)}</span> : null}
              </div>
            </div>
            <div className="quote">
              <div className="quoteMark">“</div>
              <div className="quoteText">{quote}</div>
            </div>
          </div>

          <div className="heroGrid">
            <div className="kpi">
              <div className="kpiLabel">Balance</div>
              <div className="kpiValue">{fmtMoney(currentBalance)}</div>
            </div>
            <div className="kpi">
              <div className="kpiLabel">Equity</div>
              <div className="kpiValue">{fmtMoney(currentEquity)}</div>
            </div>
            <div className="kpi">
              <div className="kpiLabel">Since start (P/L)</div>
              <div className={`kpiValue ${sinceStartPL > 0 ? "pos" : sinceStartPL < 0 ? "neg" : ""}`}>
                {fmtMoney(sinceStartPL)}
              </div>
            </div>
            <div className="kpi chartKpi">
              <div className="kpiLabel">Equity trend</div>
              <TinyLine data={chartData} />
            </div>
          </div>

          <div className="heroFoot dim small">
            Weekly profit-share uses MT5 equity snapshots only (week starts Monday 00:00 local).
          </div>
        </div>
      </section>

      <section className="grid">
        <section className="card">
          <div className="sectionHead">
            <h2 className="sectionTitle">Pairing</h2>
            <div className="dim small">Connect your MT5 to your portal</div>
          </div>

          <div className="pairGrid">
            <div className="pairCard">
              <div className="pairLabel">Your pairing code</div>
              <div className="pairCode">{conn?.pairing_code || "—"}</div>
              <div className="pairMeta">
                <div className="dim">This is linked to your account.</div>
                <div className="dim">
                  MT5 Login: <b>{conn?.mt5_login || "—"}</b>
                </div>
              </div>
            </div>

            <div className="pairCard">
              <div className="pairLabel">Profit share</div>
              <div className="pairCode">30% of profits — weekly</div>
              <div className="pairMeta">
                <div className="dim">We calculate using your MT5 equity snapshots (week starts Monday 00:00).</div>
              </div>
            </div>
          </div>

          <div className="dim small note">
            If your portal shows “—”, your MT5 snapshot sender may not be running yet.
          </div>
        </section>

        <section className="card">
          <div className="sectionHead">
            <h2 className="sectionTitle">Performance</h2>
            <div className="dim small">Weekly profit share + drawdown</div>
          </div>

          <div className="statsGrid">
            <div className="stat">
              <div className="statLabel">Week start equity</div>
              <div className="statValue">{weekStartEquity === null ? "—" : fmtMoney(weekStartEquity)}</div>
              <div className="statHint">From first snapshot since Monday 00:00 (local).</div>
            </div>

            <div className="stat">
              <div className="statLabel">Current equity</div>
              <div className="statValue">{currentEquity === null ? "—" : fmtMoney(currentEquity)}</div>
              <div className="statHint">Latest MT5 equity.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Weekly P/L</div>
              <div className={`statValue ${weeklyPL > 0 ? "pos" : weeklyPL < 0 ? "neg" : ""}`}>
                {weeklyPL === null ? "—" : fmtMoney(weeklyPL)}
              </div>
              <div className="statHint">Current equity minus week start equity.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Profit share due (30%)</div>
              <div className="statValue">{weeklyFeeDue === null ? "—" : fmtMoney(weeklyFeeDue)}</div>
              <div className="statHint">If weekly P/L is negative, fee stays £0.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Client keeps (70% of profits)</div>
              <div className="statValue">{weeklyClientKeeps === null ? "—" : fmtMoney(weeklyClientKeeps)}</div>
              <div className="statHint">Only counts on profits this week.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Drawdown from all-time peak</div>
              <div className={`statValue ${hwmDrawdownPct > 0 ? "neg" : ""}`}>
                {hwmDrawdownPct === null ? "—" : `${hwmDrawdownPct.toFixed(2)}%`}
              </div>
              <div className="statHint">Peak equity is computed from mt5_snapshots (no extra table).</div>
            </div>
          </div>

          <div className="payRow">
            <button
              className="primaryBtn"
              type="button"
              onClick={payWithStripe}
              disabled={payLoading || !weeklyFeeDue || weeklyFeeDue <= 0}
            >
              {payLoading ? "Opening checkout…" : "Pay profit share (Stripe)"}
            </button>
            <div className="finePrint">
              Week start (ISO): <span className="mono">{weekStartIsoLabel}</span>
            </div>
          </div>

          <div className="dim small note">
            Stripe endpoints show <b>405</b> if you open them in browser. That’s normal — the button sends a POST.
          </div>
        </section>

        <section className="card full">
          <div className="sectionHead">
            <h2 className="sectionTitle">Recent snapshots</h2>
            <div className="dim small">Last {snapshots?.length || 0} records</div>
          </div>

          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Equity</th>
                  <th>Balance</th>
                  <th>Margin</th>
                  <th>Free</th>
                </tr>
              </thead>
              <tbody>
                {(snapshots || []).map((s) => (
                  <tr key={s.created_at}>
                    <td className="mono">{fmtTime(s.created_at)}</td>
                    <td>{fmtMoney(s.equity)}</td>
                    <td>{fmtMoney(s.balance)}</td>
                    <td>{fmtMoney(s.margin)}</td>
                    <td>{fmtMoney(s.free_margin)}</td>
                  </tr>
                ))}
                {!snapshots?.length ? (
                  <tr>
                    <td colSpan={5} className="dim">
                      No snapshots yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="foot dim small">
            You’re logged in as <span className="mono">{user.email}</span>
          </div>
        </section>
      </section>

      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
.wrap{min-height:100vh;padding:20px;background:radial-gradient(1200px 600px at 10% 0%,rgba(255,215,0,.08),transparent),radial-gradient(900px 600px at 90% 10%,rgba(255,215,0,.06),transparent),#070707;color:#f7f7f7}
.topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}
.brand{display:flex;align-items:center;gap:12px}
.logo{width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#3a2a00,#f8d773);display:grid;place-items:center;font-weight:900;color:#1b1200;box-shadow:0 10px 26px rgba(0,0,0,.35)}
.stack{display:flex;flex-direction:column}
.h1{font-size:18px;font-weight:800;letter-spacing:.2px}
.dim{opacity:.78}
.small{font-size:12px}
.actions{display:flex;gap:10px;flex-wrap:wrap}
.btn{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;padding:10px 12px;border-radius:12px;cursor:pointer}
.btn:hover{background:rgba(255,255,255,.1)}
.btn:disabled{opacity:.5;cursor:not-allowed}
.ghost{background:transparent}
.toast{position:fixed;left:50%;transform:translateX(-50%);top:16px;background:rgba(20,20,20,.92);border:1px solid rgba(255,255,255,.12);padding:10px 14px;border-radius:12px;z-index:50}
.hero{margin-bottom:18px}
.heroCard{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);border-radius:18px;padding:16px;box-shadow:0 22px 40px rgba(0,0,0,.35)}
.heroTop{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
.heroTitle{font-size:16px;font-weight:800}
.quote{display:flex;gap:10px;max-width:420px}
.quoteMark{font-size:32px;line-height:1;color:rgba(255,215,0,.85)}
.quoteText{font-size:13px;opacity:.9;line-height:1.35}
.heroGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:14px}
.kpi{border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);border-radius:16px;padding:12px}
.kpiLabel{font-size:12px;opacity:.75}
.kpiValue{font-size:18px;font-weight:900;margin-top:6px}
.pos{color:#57ff9e}
.neg{color:#ff6b6b}
.chartKpi{padding-bottom:8px}
.tinyChart{margin-top:6px}
.lineMain{fill:none;stroke:rgba(255,215,0,.95);stroke-width:2.2}
.lineDim{fill:none;stroke:rgba(255,255,255,.2);stroke-width:1.5}
.heroFoot{margin-top:10px}
.grid{display:grid;grid-template-columns:1fr;gap:14px}
.card{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);border-radius:18px;padding:16px;box-shadow:0 18px 34px rgba(0,0,0,.32)}
.full{grid-column:1/-1}
.sectionHead{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.sectionTitle{font-size:15px;font-weight:900}
.pairGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.pairCard{border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);border-radius:16px;padding:12px}
.pairLabel{font-size:12px;opacity:.75}
.pairCode{font-size:18px;font-weight:950;margin-top:6px}
.pairMeta{margin-top:8px;display:flex;flex-direction:column;gap:4px}
.note{margin-top:12px}
.statsGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.stat{border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);border-radius:16px;padding:12px}
.statLabel{font-size:12px;opacity:.75}
.statValue{font-size:18px;font-weight:950;margin-top:6px}
.statHint{font-size:12px;opacity:.75;margin-top:6px;line-height:1.35}
.payRow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:14px}
.payRow .finePrint{opacity:.8;font-size:12px;line-height:1.4}
.primaryBtn{border:1px solid rgba(255,215,0,.35);background:linear-gradient(135deg,rgba(255,215,0,.26),rgba(255,215,0,.08));color:#fff;padding:12px 14px;border-radius:14px;font-weight:900;cursor:pointer}
.primaryBtn:disabled{opacity:.5;cursor:not-allowed}
.tableWrap{overflow:auto;border-radius:16px;border:1px solid rgba(255,255,255,.08)}
.table{width:100%;border-collapse:collapse;min-width:640px}
.table th,.table td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.06);text-align:left}
.table th{font-size:12px;opacity:.75}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
.foot{margin-top:12px}
@media (max-width:980px){
  .heroGrid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .pairGrid{grid-template-columns:1fr}
  .statsGrid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:520px){
  .wrap{padding:14px}
  .heroGrid{grid-template-columns:1fr}
  .statsGrid{grid-template-columns:1fr}
  .btn{width:100%}
  .primaryBtn{width:100%}
}
`;
