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
function fmtNum(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  return Number(n).toFixed(2);
}
function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
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

/* ---------- tiny SVG chart (no libs) ---------- */
function buildPath(points, w = 1000, h = 320, pad = 18) {
  if (!points || points.length < 2) return { line: "", area: "", min: null, max: null, first: null, last: null };

  const vals = points.map((p) => Number(p.v)).filter((x) => Number.isFinite(x));
  if (vals.length < 2) return { line: "", area: "", min: null, max: null, first: null, last: null };

  let min = Math.min(...vals);
  let max = Math.max(...vals);

  if (min === max) {
    min = min - 1;
    max = max + 1;
  }

  const usableH = h - pad * 2;
  const usableW = w - pad * 2;

  const toXY = (i, v) => {
    const x = pad + (i / (points.length - 1)) * usableW;
    const t = (v - min) / (max - min);
    const y = pad + (1 - t) * usableH;
    return { x, y };
  };

  const coords = points.map((p, i) => toXY(i, Number(p.v)));

  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(" ");
  const area =
    `${line} ` +
    `L ${(pad + usableW).toFixed(2)} ${(pad + usableH).toFixed(2)} ` +
    `L ${pad.toFixed(2)} ${(pad + usableH).toFixed(2)} Z`;

  return { line, area, min: Math.min(...vals), max: Math.max(...vals), first: vals[0], last: vals[vals.length - 1] };
}

function ChartBlock({ title, subtitle, points, kind }) {
  const meta = useMemo(() => buildPath(points), [points]);
  const isDD = kind === "dd";

  if (!points || points.length < 2 || !meta.line) {
    return (
      <div className="chartEmpty">
        <div className="chartEmptyTitle">No chart data yet</div>
        <div className="chartEmptySub">Waiting for more snapshots…</div>
      </div>
    );
  }

  const change = meta.last - meta.first;
  const changePct = meta.first ? (change / meta.first) * 100 : 0;

  return (
    <div className="chartWrap">
      <div className="chartMeta">
        <div className="chartMetaItem">
          <div className="dim">{isDD ? "Min DD" : "Range low"}</div>
          <div className="gold">{isDD ? `${meta.min.toFixed(2)}%` : fmtMoney(meta.min)}</div>
        </div>
        <div className="chartMetaItem">
          <div className="dim">{isDD ? "Max DD" : "Range high"}</div>
          <div className="gold">{isDD ? `${meta.max.toFixed(2)}%` : fmtMoney(meta.max)}</div>
        </div>
        <div className="chartMetaItem">
          <div className="dim">{isDD ? "DD change" : "Change"}</div>
          <div className={`gold ${change > 0 ? "pos" : change < 0 ? "neg" : ""}`}>
            {isDD ? `${change.toFixed(2)}%` : fmtMoney(change)} {!isDD ? `(${changePct.toFixed(2)}%)` : ""}
          </div>
        </div>
      </div>

      <div className="chartBox">
        <div className="chartTitleRow">
          <div>
            <div className="chartTitle">{title}</div>
            <div className="chartSub">{subtitle}</div>
          </div>
        </div>

        <svg viewBox="0 0 1000 320" className="chartSvg" preserveAspectRatio="none" aria-label={title}>
          <defs>
            <linearGradient id={`goldStroke-${kind}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(230,195,106,0.35)" />
              <stop offset="55%" stopColor="rgba(247,227,165,0.95)" />
              <stop offset="100%" stopColor="rgba(230,195,106,0.35)" />
            </linearGradient>
            <linearGradient id={`goldFill-${kind}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(230,195,106,0.20)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>

          {[40, 120, 200, 280].map((y) => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(230,195,106,0.08)" strokeWidth="2" />
          ))}

          <path d={meta.area} fill={`url(#goldFill-${kind})`} />
          <path d={meta.line} fill="none" stroke={`url(#goldStroke-${kind})`} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function parseAdminEmailsPublic() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export default function ClientPortal() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  const [loadingData, setLoadingData] = useState(false);
  const [conn, setConn] = useState(null);
  const [latest, setLatest] = useState(null);
  const [first, setFirst] = useState(null);
  const [snapshots, setSnapshots] = useState([]);

  // fee state
  const [feeState, setFeeState] = useState(null); // {paid_hwm,last_fee_paid,last_paid_at}

  // peaks (for dd only)
  const [peakAll, setPeakAll] = useState(null);

  // charts
  const [range, setRange] = useState("24h");
  const [chartMode, setChartMode] = useState("equity");
  const [equitySeries, setEquitySeries] = useState([]);
  const [ddSeries, setDdSeries] = useState([]);
  const [seriesLoading, setSeriesLoading] = useState(false);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [lastRefreshAt, setLastRefreshAt] = useState(null);

  const refreshTimer = useRef(null);
  const realtimeChannelRef = useRef(null);

  const quotes = useMemo(
    () => [
      "Discipline is a cheat code.",
      "Protect capital. Let time do the rest.",
      "You don’t need more trades — you need cleaner trades.",
      "Patience compounds louder than hype.",
      "Risk first. Reward follows.",
      "Consistency beats intensity.",
      "The market pays the calm, not the emotional.",
      "If it’s not clean, it’s not a trade.",
      "Your edge is execution, not prediction.",
      "Boring trading beats emotional trading.",
    ],
    []
  );

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2500);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      showToast("Copied ✅");
    } catch {
      showToast("Copy failed — hold to copy.");
    }
  };

  const pickNewQuote = () => setQuoteIndex(Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const t = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 9000);
    return () => clearInterval(t);
  }, [quotes.length]);

  // auth
  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user;
      if (!u) {
        setChecking(false);
        router.push("/login");
        return;
      }
      setUser(u);
      setChecking(false);
    };
    run();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      if (!u) {
        setUser(null);
        router.push("/login");
        return;
      }
      setUser(u);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const loadSeries = async (uid, r, silent = false) => {
    if (!uid) return;
    if (!silent) setSeriesLoading(true);

    try {
      const now = Date.now();
      const sinceMs = r === "7d" ? now - 7 * 24 * 60 * 60 * 1000 : now - 24 * 60 * 60 * 1000;
      const sinceIso = new Date(sinceMs).toISOString();

      const { data, error } = await supabase
        .from("mt5_snapshots")
        .select("equity,created_at")
        .eq("user_id", uid)
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: true })
        .limit(2500);

      if (error) throw error;

      const eqPts = (data || [])
        .map((x) => ({ t: x.created_at, v: Number(x.equity) }))
        .filter((p) => Number.isFinite(p.v));

      let peak = 0;
      const ddPts = eqPts.map((p) => {
        if (p.v > peak) peak = p.v;
        const dd = peak > 0 ? ((peak - p.v) / peak) * 100 : 0;
        return { t: p.t, v: clamp(dd, 0, 100) };
      });

      setEquitySeries(eqPts);
      setDdSeries(ddPts);
    } catch (e) {
      console.log(e);
    } finally {
      if (!silent) setSeriesLoading(false);
    }
  };

  const refresh = async (opts = { silent: false }) => {
    if (!user?.id) return;
    if (!opts?.silent) setLoadingData(true);

    try {
      const { data: c, error: cErr } = await supabase
        .from("mt5_connections")
        .select("pairing_code,status,mt5_login,last_seen_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cErr) throw cErr;
      setConn(c || null);

      const { data: lastSnap, error: lErr } = await supabase
        .from("mt5_snapshots")
        .select("id,balance,equity,margin,free_margin,created_at,mt5_login")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (lErr) throw lErr;
      setLatest(lastSnap?.[0] || null);

      const { data: firstSnap, error: fErr } = await supabase
        .from("mt5_snapshots")
        .select("balance,equity,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1);
      if (fErr) throw fErr;
      setFirst(firstSnap?.[0] || null);

      const { data: rec, error: rErr } = await supabase
        .from("mt5_snapshots")
        .select("equity,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(200);
      if (rErr) throw rErr;
      setSnapshots(rec || []);

      // all-time peak equity (for drawdown display)
      const { data: top1 } = await supabase
        .from("mt5_snapshots")
        .select("equity")
        .eq("user_id", user.id)
        .order("equity", { ascending: false })
        .limit(1);
      const pk = Number(top1?.[0]?.equity);
      setPeakAll(Number.isFinite(pk) ? pk : null);

      // fee state (paid watermark)
      const { data: fs, error: fsErr } = await supabase
        .from("mt5_fee_state")
        .select("paid_hwm,last_fee_paid,last_paid_at,updated_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (fsErr) console.log(fsErr);
      setFeeState(fs || null);

      await loadSeries(user.id, range, true);
      setLastRefreshAt(new Date().toISOString());
    } catch (e) {
      console.log(e);
      showToast("Couldn’t load data. Try refresh.");
    } finally {
      if (!opts?.silent) setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checking && user?.id) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking, user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    refreshTimer.current = window.setInterval(() => refresh({ silent: true }), 30000);
    return () => window.clearInterval(refreshTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    loadSeries(user.id, range, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    if (realtimeChannelRef.current) {
      supabase.removeChannel(realtimeChannelRef.current);
      realtimeChannelRef.current = null;
    }

    const channel = supabase
      .channel(`portal-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mt5_snapshots", filter: `user_id=eq.${user.id}` },
        () => {
          window.clearTimeout(channel._t);
          channel._t = window.setTimeout(() => refresh({ silent: true }), 350);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mt5_connections", filter: `user_id=eq.${user.id}` },
        () => {
          window.clearTimeout(channel._t2);
          channel._t2 = window.setTimeout(() => refresh({ silent: true }), 350);
        }
      )
      .subscribe();

    realtimeChannelRef.current = channel;

    return () => {
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const connectedStatus = useMemo(() => {
    const snapTime = latest?.created_at ? new Date(latest.created_at).getTime() : 0;
    const mins = snapTime ? (Date.now() - snapTime) / 60000 : 9999;

    if (!conn?.pairing_code) return { label: "Not paired", tone: "warn" };
    if (!latest) return { label: "Waiting snapshot", tone: "warn" };
    if (mins <= 2) return { label: "Live", tone: "ok" };
    if (mins <= 6) return { label: "Delayed", tone: "warn" };
    return { label: "Offline", tone: "warn" };
  }, [conn?.pairing_code, latest]);

  const startEquity = useMemo(() => {
    const b = first?.equity ?? first?.balance ?? null;
    return b === null ? null : Number(b);
  }, [first]);

  const currentEquity = useMemo(() => {
    const e = latest?.equity ?? null;
    return e === null ? null : Number(e);
  }, [latest]);

  const currentBalance = useMemo(() => {
    const b = latest?.balance ?? null;
    return b === null ? null : Number(b);
  }, [latest]);

  const floating = useMemo(() => {
    if (currentEquity === null || currentBalance === null) return null;
    return Number(currentEquity - currentBalance);
  }, [currentEquity, currentBalance]);

  // paid watermark effective (if none, default to starting equity)
  const paidHwmEffective = useMemo(() => {
    const p = Number(feeState?.paid_hwm);
    if (Number.isFinite(p) && p > 0) return p;
    return startEquity;
  }, [feeState?.paid_hwm, startEquity]);

  // fee due NOW (only above paid watermark)
  const feeDueNow = useMemo(() => {
    if (!Number.isFinite(currentEquity) || !Number.isFinite(paidHwmEffective)) return null;
    return Math.max(0, currentEquity - paidHwmEffective) * 0.3;
  }, [currentEquity, paidHwmEffective]);

  const clientShareNow = useMemo(() => {
    if (!Number.isFinite(currentEquity) || !Number.isFinite(paidHwmEffective)) return null;
    return Math.max(0, currentEquity - paidHwmEffective) * 0.7;
  }, [currentEquity, paidHwmEffective]);

  const hwmDrawdownPct = useMemo(() => {
    if (!Number.isFinite(peakAll) || !Number.isFinite(currentEquity) || peakAll <= 0) return null;
    return clamp(((peakAll - currentEquity) / peakAll) * 100, 0, 100);
  }, [peakAll, currentEquity]);

  const drawdownRecentPct = useMemo(() => {
    if (!snapshots?.length) return null;
    const series2 = [...snapshots].map((s) => Number(s.equity)).filter((x) => Number.isFinite(x)).reverse();
    if (series2.length < 2) return null;

    let peak = series2[0];
    let maxDd = 0;
    for (const x of series2) {
      if (x > peak) peak = x;
      const dd = peak > 0 ? (peak - x) / peak : 0;
      if (dd > maxDd) maxDd = dd;
    }
    return clamp(maxDd * 100, 0, 100);
  }, [snapshots]);

  const portalHint = useMemo(() => {
    if (!conn?.pairing_code) return "Your account isn’t paired yet. Go to Get Started, connect the bot, then your dashboard updates automatically.";
    if (!latest) return "Paired ✅. Waiting for the first MT5 snapshot… (Once the bot sends data, stats appear here.)";
    return "Live MT5 stats are updating through the reporting pipeline.";
  }, [conn?.pairing_code, latest]);

  const isAdmin = useMemo(() => {
    const admins = parseAdminEmailsPublic();
    const em = (user?.email || "").toLowerCase();
    return admins.includes(em);
  }, [user?.email]);

  const settleFeeAdmin = async () => {
    if (!isAdmin) return;
    if (!confirm("Admin settle fee now? This will move PAID watermark up to CURRENT equity.")) return;

    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) {
      showToast("No session token.");
      return;
    }

    const res = await fetch("/api/fees/settle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(j?.error || "Settle failed");
      return;
    }

    showToast(`Settled ✅ Fee paid: ${fmtMoney(j.fee_paid)}`);
    refresh();
  };

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "radial-gradient(circle at top, #2a1f0f, #000)", color: "#f7f0da", padding: 18 }}>
        Loading…
      </div>
    );
  }

  return (
    <div className="wrap">
      <header className="topBar">
        <a href="/" className="backLink">
          <img src="/emblem.jpg" alt="Winners Circle University" className="logoImg" />
          <span>Back to main site</span>
        </a>

        <div className="rightSide">
          <div className="statusPill" data-tone={connectedStatus.tone}>
            {connectedStatus.label}
          </div>

          <div className="userTag" title={user?.email || ""}>
            {user?.email || "Client"}
          </div>

          <button className="ghostBtn" type="button" onClick={() => refresh()} disabled={loadingData}>
            {loadingData ? "Refreshing…" : "Refresh"}
          </button>

          <button className="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main">
        {/* HERO */}
        <section className="card hero">
          <div className="heroTop">
            <div>
              <div className="pill">LIVE CLIENT PORTAL · PAID WATERMARK ENGINE</div>
              <h1 className="title">Client Dashboard</h1>
              <p className="lead">{portalHint}</p>
              <div className="metaLine">
                <span className="dim">Last refresh:</span> <span className="gold">{lastRefreshAt ? agoLabel(lastRefreshAt) : "—"}</span>
                <span className="sep">·</span>
                <span className="dim">Last snapshot:</span> <span className="gold">{latest?.created_at ? agoLabel(latest.created_at) : "—"}</span>
              </div>
            </div>

            <div className="quoteBox">
              <div className="quoteLabel">Today’s push</div>
              <div className="quoteText">“{quotes[quoteIndex]}”</div>
              <div className="quoteActions">
                <button className="miniBtn" type="button" onClick={() => setQuoteIndex(Math.floor(Math.random() * quotes.length))}>
                  New quote
                </button>
              </div>
            </div>
          </div>

          <div className="pairRow">
            <div className="pairCard">
              <div className="pairLabel">Pairing code</div>
              <div className="pairCode">{conn?.pairing_code || "—"}</div>
              <div className="pairActions">
                <button className="miniBtn" type="button" onClick={() => copyText(conn?.pairing_code || "")} disabled={!conn?.pairing_code}>
                  Copy
                </button>
                <a className="miniBtn miniLink" href="/get-started">
                  Get Started
                </a>
              </div>
              <div className="pairMeta">
                <div>
                  <span className="dim">MT5 login:</span> <span className="gold">{conn?.mt5_login || latest?.mt5_login || "—"}</span>
                </div>
                <div>
                  <span className="dim">Last seen:</span> <span className="gold">{fmtTime(conn?.last_seen_at)}</span>
                </div>
              </div>
            </div>

            <div className="pairCard">
              <div className="pairLabel">Fee logic</div>
              <div className="pairCode">30% only above PAID watermark</div>
              <div className="pairMeta">
                <div className="dim">Clients cannot change watermark. Only admin can settle after payment.</div>
              </div>
            </div>
          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="card">
          <h2 className="sectionTitle">Performance</h2>

          <div className="statsGrid">
            <div className="stat">
              <div className="statLabel">Current equity</div>
              <div className="statValue">{currentEquity === null ? "—" : fmtMoney(currentEquity)}</div>
              <div className="statHint">Latest MT5 equity.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Paid watermark</div>
              <div className="statValue">{paidHwmEffective === null ? "—" : fmtMoney(paidHwmEffective)}</div>
              <div className="statHint">Fee is only charged above this level.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Fee due now (30%)</div>
              <div className="statValue">{feeDueNow === null ? "—" : fmtMoney(feeDueNow)}</div>
              <div className="statHint">If you’re below watermark, this stays £0.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Client share on new high (70%)</div>
              <div className="statValue">{clientShareNow === null ? "—" : fmtMoney(clientShareNow)}</div>
              <div className="statHint">Only counts above watermark.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Drawdown from all-time peak</div>
              <div className={`statValue ${hwmDrawdownPct > 0 ? "neg" : ""}`}>
                {hwmDrawdownPct === null ? "—" : `${hwmDrawdownPct.toFixed(2)}%`}
              </div>
              <div className="statHint">From your highest equity ever recorded.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Last fee settled</div>
              <div className="statValue">{feeState?.last_paid_at ? fmtTime(feeState.last_paid_at) : "—"}</div>
              <div className="statHint">{feeState?.last_fee_paid ? `Last paid: ${fmtMoney(feeState.last_fee_paid)}` : "No settlement recorded yet."}</div>
            </div>
          </div>

          <div className="subGrid">
            <div className="miniCard">
              <div className="miniLabel">Balance</div>
              <div className="miniValue">{fmtMoney(latest?.balance)}</div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Floating P/L</div>
              <div className={`miniValue ${floating < 0 ? "neg" : floating > 0 ? "pos" : ""}`}>
                {floating === null ? "—" : fmtMoney(floating)}
              </div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Free margin</div>
              <div className="miniValue">{fmtNum(latest?.free_margin)}</div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Max DD (recent)</div>
              <div className="miniValue">{drawdownRecentPct === null ? "—" : `${drawdownRecentPct.toFixed(2)}%`}</div>
            </div>
          </div>

          <div className="footNote">
            Last snapshot: <span className="gold">{fmtTime(latest?.created_at)}</span>
          </div>

          {isAdmin && (
            <div className="adminBox">
              <div className="adminTitle">Admin Actions</div>
              <div className="adminText">Use this only after client has paid the 30%.</div>
              <button className="primaryBtn" type="button" onClick={settleFeeAdmin} disabled={!feeDueNow || feeDueNow <= 0}>
                Settle fee (move watermark to current equity)
              </button>
              <div className="finePrint" style={{ marginTop: 10 }}>
                This prevents double-charging: after settle, fee due becomes £0 until the next new high.
              </div>
            </div>
          )}
        </section>

        {/* CHARTS */}
        <section className="card">
          <div className="chartHead">
            <h2 className="sectionTitle" style={{ margin: 0 }}>
              Charts
            </h2>

            <div className="chartControls">
              <div className="modePills">
                <button className={`rangeBtn ${chartMode === "equity" ? "active" : ""}`} type="button" onClick={() => setChartMode("equity")} disabled={seriesLoading}>
                  Equity
                </button>
                <button className={`rangeBtn ${chartMode === "dd" ? "active" : ""}`} type="button" onClick={() => setChartMode("dd")} disabled={seriesLoading}>
                  Drawdown
                </button>
              </div>

              <div className="rangePills">
                <button className={`rangeBtn ${range === "24h" ? "active" : ""}`} type="button" onClick={() => setRange("24h")} disabled={seriesLoading}>
                  24H
                </button>
                <button className={`rangeBtn ${range === "7d" ? "active" : ""}`} type="button" onClick={() => setRange("7d")} disabled={seriesLoading}>
                  7D
                </button>
              </div>
            </div>
          </div>

          <div className="leadSmall" style={{ marginTop: 8 }}>
            {seriesLoading ? "Loading…" : `Showing ${range === "7d" ? "7 days" : "24 hours"} of snapshots.`}
          </div>

          {chartMode === "equity" ? (
            <ChartBlock kind="equity" title="Equity Curve" subtitle="Tracks equity over time (snapshots)." points={equitySeries} />
          ) : (
            <ChartBlock kind="dd" title="Drawdown Curve" subtitle="Running-peak drawdown % (0% = at peak)." points={ddSeries} />
          )}
        </section>

        <p className="disclaimer">Trading is high risk. This is not financial advice.</p>
      </main>

      {!!toast && <div className="toast">{toast}</div>}

      <style jsx>{`
        .wrap{min-height:100vh;background:radial-gradient(circle at top,#2a1f0f,#000);color:#f7f0da;padding:18px 14px 40px}
        .topBar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}
        .backLink{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#f7f0da;font-size:14px;font-weight:800}
        .logoImg{height:36px;width:auto;filter:drop-shadow(0 0 14px rgba(230,195,106,.45))}
        .rightSide{display:inline-flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
        .statusPill{padding:8px 12px;border-radius:999px;border:1px solid rgba(230,195,106,.22);background:rgba(0,0,0,.55);font-weight:900;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
        .statusPill[data-tone="ok"]{color:#b8ffcc;border-color:rgba(184,255,204,.22)}
        .statusPill[data-tone="warn"]{color:#ffd59e;border-color:rgba(255,213,158,.22)}
        .userTag{padding:8px 12px;border-radius:999px;border:1px solid rgba(230,195,106,.22);background:rgba(0,0,0,.55);color:#ffe29b;font-weight:900;font-size:12px;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .ghostBtn{background:transparent;border:1px solid rgba(230,195,106,.25);color:#e6c36a;padding:9px 14px;border-radius:999px;font-weight:900;cursor:pointer}
        .ghostBtn:disabled{opacity:.6;cursor:not-allowed}
        .logoutBtn{background:rgba(230,195,106,.12);border:1px solid rgba(230,195,106,.35);color:#e6c36a;padding:9px 14px;border-radius:999px;font-weight:900;cursor:pointer}
        .main{max-width:980px;margin:0 auto}
        .card{border-radius:24px;border:1px solid rgba(230,195,106,.22);background:radial-gradient(circle at top left,rgba(230,195,106,.1),rgba(0,0,0,.88));padding:18px 16px;margin-bottom:14px;box-shadow:0 0 60px rgba(0,0,0,.6)}
        .hero .pill{display:inline-block;padding:6px 12px;border-radius:999px;border:1px solid rgba(230,195,106,.28);color:#e6c36a;font-size:11px;letter-spacing:.16em;margin-bottom:10px;text-transform:uppercase}
        .heroTop{display:grid;grid-template-columns:1.2fr .8fr;gap:14px;align-items:start}
        @media (max-width:860px){.heroTop{grid-template-columns:1fr}}
        .title{margin:0 0 6px;color:#f5e1a4;font-size:26px;line-height:1.15}
        .lead{margin:0;color:#d8d2b6;line-height:1.7;font-size:14px}
        .metaLine{margin-top:10px;font-size:13px;color:#d8d2b6;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
        .sep{opacity:.7}
        .quoteBox{border-radius:18px;border:1px solid rgba(230,195,106,.18);background:rgba(0,0,0,.55);padding:14px}
        .quoteLabel{font-size:12px;color:#bfae78;margin-bottom:6px;font-weight:800}
        .quoteText{font-size:14px;color:#ffe29b;font-weight:900;line-height:1.5}
        .quoteActions{margin-top:10px}
        .pairRow{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
        @media (max-width:860px){.pairRow{grid-template-columns:1fr}}
        .pairCard{border-radius:18px;border:1px solid rgba(230,195,106,.18);background:rgba(0,0,0,.55);padding:14px}
        .pairLabel{font-size:12px;color:#bfae78;font-weight:900;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
        .pairCode{font-size:18px;font-weight:1000;color:#f7e3a5;letter-spacing:.12em;word-break:break-word}
        .pairActions{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}
        .miniBtn{border-radius:999px;padding:8px 12px;border:1px solid rgba(230,195,106,.25);background:rgba(230,195,106,.08);color:#e6c36a;font-weight:900;cursor:pointer;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
        .miniBtn:disabled{opacity:.6;cursor:not-allowed}
        .miniLink{background:transparent}
        .pairMeta{margin-top:10px;display:grid;gap:6px;font-size:13px}
        .dim{color:#bfae78}
        .gold{color:#f7e3a5;font-weight:900}
        .pos{color:#b8ffcc!important}
        .neg{color:#ffb8b8!important}
        .sectionTitle{margin:0 0 12px;color:#e6c36a;font-size:18px;font-weight:1000}
        .statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        @media (max-width:900px){.statsGrid{grid-template-columns:1fr}}
        .stat{border-radius:18px;border:1px solid rgba(230,195,106,.16);background:rgba(0,0,0,.55);padding:14px}
        .statLabel{font-size:12px;color:#bfae78;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}
        .statValue{font-size:20px;font-weight:1000;color:#f7e3a5;margin-bottom:6px}
        .statHint{font-size:13px;color:#d8d2b6;line-height:1.5}
        .subGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}
        @media (max-width:900px){.subGrid{grid-template-columns:1fr 1fr}}
        @media (max-width:520px){.subGrid{grid-template-columns:1fr}}
        .miniCard{border-radius:18px;border:1px solid rgba(230,195,106,.14);background:rgba(0,0,0,.55);padding:12px}
        .miniLabel{font-size:12px;color:#bfae78;font-weight:900;margin-bottom:6px}
        .miniValue{font-size:16px;font-weight:1000;color:#f7e3a5}
        .footNote{margin-top:10px;font-size:13px;color:#d8d2b6}
        .leadSmall{margin:0 0 12px;color:#d8d2b6;line-height:1.7;font-size:14px}
        .primaryBtn{border-radius:999px;padding:12px 16px;border:1px solid rgba(230,195,106,.35);background:linear-gradient(180deg,rgba(230,195,106,.22),rgba(0,0,0,.75));color:#f7e3a5;font-weight:1000;cursor:pointer}
        .primaryBtn:disabled{opacity:.5;cursor:not-allowed}
        .finePrint{margin-top:10px;font-size:13px;color:#bfae78;line-height:1.6}
        .adminBox{margin-top:14px;border-radius:18px;border:1px dashed rgba(230,195,106,.32);background:rgba(0,0,0,.55);padding:14px}
        .adminTitle{font-weight:1000;color:#f7e3a5;margin-bottom:6px}
        .adminText{color:#d8d2b6;margin-bottom:10px;font-size:13px;line-height:1.6}
        .disclaimer{margin:10px 0 0;font-size:12px;color:rgba(255,255,255,.6);line-height:1.6;text-align:center}
        .toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);background:rgba(0,0,0,.85);border:1px solid rgba(230,195,106,.22);color:#f7e3a5;padding:10px 14px;border-radius:999px;font-weight:900;z-index:9999;box-shadow:0 0 30px rgba(0,0,0,.6)}
        .chartHead{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
        .chartControls{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:flex-end}
        .modePills,.rangePills{display:inline-flex;gap:8px;align-items:center}
        .rangeBtn{border-radius:999px;padding:8px 12px;border:1px solid rgba(230,195,106,.22);background:rgba(0,0,0,.55);color:#e6c36a;font-weight:1000;cursor:pointer;min-width:84px}
        .rangeBtn.active{background:rgba(230,195,106,.14);border-color:rgba(230,195,106,.45);color:#f7e3a5}
        .rangeBtn:disabled{opacity:.6;cursor:not-allowed}
        .chartWrap{margin-top:10px}
        .chartMeta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:10px}
        @media (max-width:860px){.chartMeta{grid-template-columns:1fr}}
        .chartMetaItem{border-radius:16px;border:1px solid rgba(230,195,106,.14);background:rgba(0,0,0,.55);padding:12px}
        .chartBox{border-radius:18px;border:1px solid rgba(230,195,106,.16);background:rgba(0,0,0,.55);overflow:hidden;padding:12px}
        .chartTitleRow{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-bottom:10px}
        .chartTitle{font-weight:1000;color:#f7e3a5;margin-bottom:2px}
        .chartSub{color:#bfae78;font-size:13px}
        .chartSvg{width:100%;height:240px;display:block}
        .chartEmpty{border-radius:18px;border:1px solid rgba(230,195,106,.16);background:rgba(0,0,0,.55);padding:20px;text-align:center}
        .chartEmptyTitle{font-weight:1000;color:#f7e3a5;margin-bottom:6px}
        .chartEmptySub{color:#bfae78;font-size:13px}
      `}</style>
    </div>
  );
}
