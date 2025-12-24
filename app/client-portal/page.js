"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

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

export default function ClientPortal() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  const [loadingData, setLoadingData] = useState(false);
  const [conn, setConn] = useState(null);
  const [latest, setLatest] = useState(null);
  const [first, setFirst] = useState(null);
  const [snapshots, setSnapshots] = useState([]);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [toast, setToast] = useState("");

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
    ],
    []
  );

  // Rotate quote
  useEffect(() => {
    const t = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 9000);
    return () => clearInterval(t);
  }, [quotes.length]);

  // Auth guard
  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user;
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
      setChecking(false);
    };

    run();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      if (!u) router.push("/login");
      setUser(u);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

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

  const refresh = async () => {
    if (!user?.id) return;
    setLoadingData(true);
    try {
      // 1) Connection (pairing + status)
      const { data: c, error: cErr } = await supabase
        .from("mt5_connections")
        .select("pairing_code,status,mt5_login,last_seen_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cErr) throw cErr;
      setConn(c || null);

      // 2) Latest snapshot
      const { data: lastSnap, error: lErr } = await supabase
        .from("mt5_snapshots")
        .select("balance,equity,margin,free_margin,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (lErr) throw lErr;
      setLatest(lastSnap?.[0] || null);

      // 3) First snapshot (use as “starting balance / deposit proxy”)
      const { data: firstSnap, error: fErr } = await supabase
        .from("mt5_snapshots")
        .select("balance,equity,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1);

      if (fErr) throw fErr;
      setFirst(firstSnap?.[0] || null);

      // 4) Recent snapshots for drawdown calc (last 200)
      const { data: rec, error: rErr } = await supabase
        .from("mt5_snapshots")
        .select("equity,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(200);

      if (rErr) throw rErr;
      setSnapshots(rec || []);
    } catch (e) {
      console.log(e);
      showToast("Couldn’t load data. Try refresh.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checking && user?.id) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking, user?.id]);

  const connectedStatus = useMemo(() => {
    const last = conn?.last_seen_at ? new Date(conn.last_seen_at).getTime() : 0;
    const now = Date.now();
    const mins = last ? (now - last) / 60000 : 9999;
    if (!conn?.pairing_code) return { label: "Not paired", tone: "warn" };
    if (mins <= 5) return { label: "Connected", tone: "ok" };
    return { label: "Offline", tone: "warn" };
  }, [conn]);

  const startBalance = useMemo(() => {
    // Use first snapshot balance as “starting capital proxy”
    const b = first?.balance ?? first?.equity ?? null;
    return b === null ? null : Number(b);
  }, [first]);

  const currentEquity = useMemo(() => {
    const e = latest?.equity ?? null;
    return e === null ? null : Number(e);
  }, [latest]);

  const pnl = useMemo(() => {
    if (startBalance === null || currentEquity === null) return null;
    return Number(currentEquity - startBalance);
  }, [startBalance, currentEquity]);

  const commission30 = useMemo(() => {
    if (pnl === null) return null;
    return Math.max(0, pnl) * 0.3;
  }, [pnl]);

  const client70 = useMemo(() => {
    if (pnl === null) return null;
    return Math.max(0, pnl) * 0.7;
  }, [pnl]);

  const riskPerTrade = useMemo(() => {
    // your rule: capital ÷ 14
    if (startBalance === null) return null;
    return startBalance / 14;
  }, [startBalance]);

  const drawdownPct = useMemo(() => {
    // Simple peak-to-trough drawdown from recent equities
    if (!snapshots?.length) return null;
    const series = [...snapshots]
      .map((s) => Number(s.equity))
      .filter((x) => Number.isFinite(x))
      .reverse(); // oldest -> newest

    if (series.length < 2) return null;

    let peak = series[0];
    let maxDd = 0;

    for (const x of series) {
      if (x > peak) peak = x;
      const dd = peak > 0 ? (peak - x) / peak : 0;
      if (dd > maxDd) maxDd = dd;
    }

    return clamp(maxDd * 100, 0, 100);
  }, [snapshots]);

  const portalHint = useMemo(() => {
    if (!conn?.pairing_code) {
      return "Your account isn’t paired yet. Once we pair it, your dashboard updates automatically from MT5.";
    }
    if (!latest) {
      return "Paired ✅. Waiting for the first MT5 snapshot… (Once the bot sends data, stats appear here.)";
    }
    return "Live MT5 stats are updating through the reporting pipeline.";
  }, [conn?.pairing_code, latest]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(circle at top, #2a1f0f, #000)",
          color: "#f7f0da",
          padding: 18,
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div className="wrap">
      {/* TOP BAR */}
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

          <button className="ghostBtn" type="button" onClick={refresh} disabled={loadingData}>
            {loadingData ? "Refreshing…" : "Refresh"}
          </button>

          <button className="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        {/* HERO */}
        <section className="card hero">
          <div className="heroTop">
            <div>
              <div className="pill">LIVE CLIENT PORTAL · 70/30 SPLIT</div>
              <h1 className="title">Client Dashboard</h1>
              <p className="lead">{portalHint}</p>
            </div>

            <div className="quoteBox">
              <div className="quoteLabel">Today’s push</div>
              <div className="quoteText">“{quotes[quoteIndex]}”</div>
            </div>
          </div>

          <div className="pairRow">
            <div className="pairCard">
              <div className="pairLabel">Pairing code</div>
              <div className="pairCode">{conn?.pairing_code || "—"}</div>
              <div className="pairActions">
                <button
                  className="miniBtn"
                  type="button"
                  onClick={() => copyText(conn?.pairing_code || "")}
                  disabled={!conn?.pairing_code}
                >
                  Copy
                </button>
                <a className="miniBtn miniLink" href="/get-started">
                  Get Started
                </a>
              </div>
              <div className="pairMeta">
                <div>
                  <span className="dim">MT5 login:</span>{" "}
                  <span className="gold">{conn?.mt5_login || "—"}</span>
                </div>
                <div>
                  <span className="dim">Last seen:</span>{" "}
                  <span className="gold">{fmtTime(conn?.last_seen_at)}</span>
                </div>
              </div>
            </div>

            <div className="pairCard">
              <div className="pairLabel">Commission model</div>
              <div className="pairCode">30% of net profit</div>
              <div className="pairMeta">
                <div className="dim">
                  This dashboard is read-only. Clients cannot change profits here.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="card">
          <h2 className="sectionTitle">Performance</h2>

          <div className="statsGrid">
            <div className="stat">
              <div className="statLabel">Starting balance (first snapshot)</div>
              <div className="statValue">{startBalance === null ? "—" : fmtMoney(startBalance)}</div>
              <div className="statHint">Used as deposit proxy until we add real deposit tracking.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Current equity</div>
              <div className="statValue">{currentEquity === null ? "—" : fmtMoney(currentEquity)}</div>
              <div className="statHint">Latest MT5 equity reported to the server.</div>
            </div>

            <div className="stat">
              <div className="statLabel">P/L (since start)</div>
              <div className={`statValue ${pnl !== null && pnl < 0 ? "neg" : pnl !== null && pnl > 0 ? "pos" : ""}`}>
                {pnl === null ? "—" : fmtMoney(pnl)}
              </div>
              <div className="statHint">This is not editable by the client.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Your 70%</div>
              <div className="statValue">{client70 === null ? "—" : fmtMoney(client70)}</div>
              <div className="statHint">Only counts if P/L is positive.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Our 30%</div>
              <div className="statValue">{commission30 === null ? "—" : fmtMoney(commission30)}</div>
              <div className="statHint">Only charged on net profit.</div>
            </div>

            <div className="stat">
              <div className="statLabel">Risk per trade</div>
              <div className="statValue">{riskPerTrade === null ? "—" : fmtMoney(riskPerTrade)}</div>
              <div className="statHint">Rule: capital ÷ 14</div>
            </div>
          </div>

          <div className="subGrid">
            <div className="miniCard">
              <div className="miniLabel">Balance</div>
              <div className="miniValue">{fmtMoney(latest?.balance)}</div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Margin</div>
              <div className="miniValue">{fmtNum(latest?.margin)}</div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Free margin</div>
              <div className="miniValue">{fmtNum(latest?.free_margin)}</div>
            </div>
            <div className="miniCard">
              <div className="miniLabel">Drawdown (recent)</div>
              <div className="miniValue">{drawdownPct === null ? "—" : `${drawdownPct.toFixed(2)}%`}</div>
            </div>
          </div>

          <div className="footNote">
            Last snapshot: <span className="gold">{fmtTime(latest?.created_at)}</span>
          </div>
        </section>

        {/* PAYOUT BUTTONS (still manual) */}
        <section className="card">
          <h2 className="sectionTitle">Payout & Profit Share</h2>
          <p className="leadSmall">
            When a payout window opens, we confirm results together. Then you choose a method below to send the 30% share.
          </p>

          <div className="btnRow">
            <button className="primaryBtn" type="button" onClick={() => alert("Card payments are handled manually for now.")}>
              Pay 30% via Card
            </button>
            <button className="secondaryBtn" type="button" onClick={() => alert("Crypto payments are handled manually for now.")}>
              Pay 30% via Crypto
            </button>
          </div>

          <p className="finePrint">
            This portal doesn’t move money and doesn’t connect directly to your broker. It displays performance from MT5 reports.
          </p>
        </section>

        <p className="disclaimer">
          Trading is high risk. This is not financial advice. Stats update when our MT5 reporting pipeline sends snapshots.
        </p>
      </main>

      {!!toast && <div className="toast">{toast}</div>}

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          color: #f7f0da;
          padding: 18px 14px 40px;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #f7f0da;
          font-size: 14px;
          font-weight: 800;
        }

        .logoImg {
          height: 36px;
          width: auto;
          filter: drop-shadow(0 0 14px rgba(230, 195, 106, 0.45));
        }

        .rightSide {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .statusPill {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .statusPill[data-tone="ok"] {
          color: #b8ffcc;
          border-color: rgba(184, 255, 204, 0.22);
        }
        .statusPill[data-tone="warn"] {
          color: #ffd59e;
          border-color: rgba(255, 213, 158, 0.22);
        }

        .userTag {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          color: #ffe29b;
          font-weight: 900;
          font-size: 12px;
          max-width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.25);
          color: #e6c36a;
          padding: 9px 14px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
        }
        .ghostBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .logoutBtn {
          background: rgba(230, 195, 106, 0.12);
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          padding: 9px 14px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
        }

        .main {
          max-width: 980px;
          margin: 0 auto;
        }

        .card {
          border-radius: 24px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: radial-gradient(circle at top left, rgba(230, 195, 106, 0.1), rgba(0, 0, 0, 0.88));
          padding: 18px 16px;
          margin-bottom: 14px;
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
        }

        .hero .pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          color: #e6c36a;
          font-size: 11px;
          letter-spacing: 0.16em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .heroTop {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .heroTop {
            grid-template-columns: 1fr;
          }
        }

        .title {
          margin: 0 0 6px;
          color: #f5e1a4;
          font-size: 26px;
          line-height: 1.15;
        }

        .lead {
          margin: 0;
          color: #d8d2b6;
          line-height: 1.7;
          font-size: 14px;
        }

        .quoteBox {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(0, 0, 0, 0.55);
          padding: 14px 14px;
        }
        .quoteLabel {
          font-size: 12px;
          color: #bfae78;
          margin-bottom: 6px;
          font-weight: 800;
        }
        .quoteText {
          font-size: 14px;
          color: #ffe29b;
          font-weight: 900;
          line-height: 1.5;
        }

        .pairRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
        }
        @media (max-width: 860px) {
          .pairRow {
            grid-template-columns: 1fr;
          }
        }

        .pairCard {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(0, 0, 0, 0.55);
          padding: 14px;
        }
        .pairLabel {
          font-size: 12px;
          color: #bfae78;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .pairCode {
          font-size: 18px;
          font-weight: 1000;
          color: #f7e3a5;
          letter-spacing: 0.12em;
          word-break: break-word;
        }
        .pairActions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .miniBtn {
          border-radius: 999px;
          padding: 8px 12px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(230, 195, 106, 0.08);
          color: #e6c36a;
          font-weight: 900;
          cursor: pointer;
          font-size: 13px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .miniBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .miniLink {
          background: transparent;
        }
        .pairMeta {
          margin-top: 10px;
          display: grid;
          gap: 6px;
          font-size: 13px;
        }
        .dim {
          color: #bfae78;
        }
        .gold {
          color: #f7e3a5;
          font-weight: 900;
        }

        .sectionTitle {
          margin: 0 0 12px;
          color: #e6c36a;
          font-size: 18px;
          font-weight: 1000;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .statsGrid {
            grid-template-columns: 1fr;
          }
        }

        .stat {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.16);
          background: rgba(0, 0, 0, 0.55);
          padding: 14px;
        }
        .statLabel {
          font-size: 12px;
          color: #bfae78;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .statValue {
          font-size: 20px;
          font-weight: 1000;
          color: #f7e3a5;
          margin-bottom: 6px;
        }
        .statValue.pos {
          color: #b8ffcc;
        }
        .statValue.neg {
          color: #ffb8b8;
        }
        .statHint {
          font-size: 13px;
          color: #d8d2b6;
          line-height: 1.5;
        }

        .subGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 12px;
        }
        @media (max-width: 900px) {
          .subGrid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .subGrid {
            grid-template-columns: 1fr;
          }
        }

        .miniCard {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.14);
          background: rgba(0, 0, 0, 0.55);
          padding: 12px;
        }
        .miniLabel {
          font-size: 12px;
          color: #bfae78;
          font-weight: 900;
          margin-bottom: 6px;
        }
        .miniValue {
          font-size: 16px;
          font-weight: 1000;
          color: #f7e3a5;
        }

        .footNote {
          margin-top: 10px;
          font-size: 13px;
          color: #d8d2b6;
        }

        .leadSmall {
          margin: 0 0 12px;
          color: #d8d2b6;
          line-height: 1.7;
          font-size: 14px;
        }

        .btnRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .primaryBtn {
          border-radius: 999px;
          padding: 12px 16px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: linear-gradient(180deg, rgba(230, 195, 106, 0.22), rgba(0, 0, 0, 0.75));
          color: #f7e3a5;
          font-weight: 1000;
          cursor: pointer;
        }
        .secondaryBtn {
          border-radius: 999px;
          padding: 12px 16px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          color: #e6c36a;
          font-weight: 1000;
          cursor: pointer;
        }

        .finePrint {
          margin-top: 10px;
          font-size: 13px;
          color: #bfae78;
          line-height: 1.6;
        }

        .disclaimer {
          margin: 10px 0 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          text-align: center;
        }

        .toast {
          position: fixed;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(230, 195, 106, 0.22);
          color: #f7e3a5;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
          z-index: 9999;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
