"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Portal — pulls:
 *  - Latest MT5 snapshot from: mt5_snapshots
 *  - Weekly realised PnL & fee due from: mt5_weekly_pnl
 *
 * Notes:
 *  - Requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY on Vercel
 *  - Optional: NEXT_PUBLIC_WCU_ADMIN_EMAILS="you@email.com,other@email.com"
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function money(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  const num = Number(n);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(num);
}

function num(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(
    Number(n)
  );
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

/** Monday 00:00 UTC week start (simple + stable) */
function getWeekStartUTC(now = new Date()) {
  const dt = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const day = dt.getUTCDay(); // 0 Sun .. 6 Sat
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  dt.setUTCDate(dt.getUTCDate() - diff);
  dt.setUTCHours(0, 0, 0, 0);
  return dt;
}
function addDaysUTC(d, days) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

const QUOTES = [
  "Discipline is the real edge. The market rewards the calm.",
  "Protect capital first. Profit is a by-product of structure.",
  "You don’t need more trades — you need better patience.",
  "The goal is consistency, not excitement.",
  "Risk is a decision. Respect it every single time.",
  "Small wins stacked clean become big numbers.",
  "If you can’t follow rules on small capital, you won’t on big capital.",
  "Your job is execution. Outcomes are noise in the short term.",
  "No revenge trading. No impulse. No exceptions.",
  "Consistency creates inevitability.",
  "We trade a framework, not feelings.",
  "One clean week beats ten emotional days.",
];

export default function ClientPortalPage() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [snapshot, setSnapshot] = useState(null);
  const [weekly, setWeekly] = useState(null);

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [quote, setQuote] = useState(QUOTES[0]);
  const quoteIndexRef = useRef(0);

  const weekStart = useMemo(() => getWeekStartUTC(new Date()), []);
  const weekEnd = useMemo(() => addDaysUTC(weekStart, 6), [weekStart]);
  const weekStartISO = useMemo(() => isoDate(weekStart), [weekStart]);
  const weekEndISO = useMemo(() => isoDate(weekEnd), [weekEnd]);

  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_WCU_ADMIN_EMAILS || "";
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);
  const isAdmin = useMemo(() => {
    const email = (user?.email || "").toLowerCase();
    return !!email && adminEmails.includes(email);
  }, [user, adminEmails]);

  async function loadAll(u) {
    if (!u?.id) return;

    setRefreshing(true);
    setError("");
    setStatus("");

    try {
      // Latest snapshot
      const { data: sData, error: sErr } = await supabase
        .from("mt5_snapshots")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sErr) throw new Error(sErr.message);
      setSnapshot(sData || null);

      // Weekly pnl row (optional if bot hasn’t reported weekly yet)
      const { data: wData, error: wErr } = await supabase
        .from("mt5_weekly_pnl")
        .select("*")
        .eq("user_id", u.id)
        .eq("week_start", weekStartISO)
        .maybeSingle();

      if (wErr) throw new Error(wErr.message);
      setWeekly(wData || null);

      setStatus("Updated ✅");
      setTimeout(() => setStatus(""), 1200);
    } catch (e) {
      setError(e?.message || "Failed to load portal data.");
    } finally {
      setRefreshing(false);
    }
  }

  async function doLogout() {
    setError("");
    await supabase.auth.signOut();
    window.location.href = "/clientportal";
  }

  async function settleWeek() {
    try {
      setError("");
      setStatus("");

      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("No session token. Please log in again.");

      const res = await fetch("/api/fees/weekly/settle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Settle failed.");

      setStatus(`Settled ✅ Fee paid: ${money(data.fee_paid)}`);
      await loadAll(user);
      setTimeout(() => setStatus(""), 2500);
    } catch (e) {
      setError(e?.message || "Settle failed.");
    }
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const sess = data?.session || null;

      if (!mounted) return;

      setSession(sess);
      setUser(sess?.user || null);
      setLoading(false);

      if (sess?.user) loadAll(sess.user);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, sess) => {
        setSession(sess);
        setUser(sess?.user || null);
        if (sess?.user) loadAll(sess.user);
      }
    );

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rotating quotes (every 15s)
  useEffect(() => {
    const t = setInterval(() => {
      quoteIndexRef.current = (quoteIndexRef.current + 1) % QUOTES.length;
      setQuote(QUOTES[quoteIndexRef.current]);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const showLogin = !loading && !user;

  return (
    <div className="wrap">
      <header className="topBar">
        <a className="brand" href="/">
          <img src="/emblem.jpg" alt="Winners Circle University" />
          <div>
            <div className="brandName">Winners Circle University</div>
            <div className="brandTag">Client Portal</div>
          </div>
        </a>

        <div className="topRight">
          <div className="pill">
            <span className="dot" />
            LIVE · 70/30
          </div>

          {user ? (
            <button className="ghost" onClick={doLogout}>
              Logout
            </button>
          ) : (
            <a className="ghost" href="/clientportal">
              Login
            </a>
          )}
        </div>
      </header>

      <main className="main">
        {loading && (
          <section className="card">
            <div className="titleRow">
              <h1>Loading portal…</h1>
            </div>
            <p className="muted">Please wait.</p>
          </section>
        )}

        {showLogin && (
          <section className="card">
            <div className="titleRow">
              <h1>Login required</h1>
            </div>
            <p className="muted">
              You need to be logged in to view your MT5 stats and weekly profit
              share.
            </p>
            <div className="btnRow">
              <a className="gold" href="/clientportal">
                Go to Login / Signup →
              </a>
            </div>
          </section>
        )}

        {user && (
          <>
            {!!(error || status) && (
              <section className="notice">
                {error ? (
                  <div className="err">{error}</div>
                ) : (
                  <div className="ok">{status}</div>
                )}
              </section>
            )}

            <section className="grid">
              {/* Snapshot */}
              <section className="card">
                <div className="titleRow">
                  <h2>MT5 Snapshot</h2>
                  <div className="actions">
                    <button
                      className="ghost small"
                      onClick={() => loadAll(user)}
                      disabled={refreshing}
                      title="Refresh"
                    >
                      {refreshing ? "Refreshing…" : "Refresh"}
                    </button>
                  </div>
                </div>

                <p className="muted">
                  Latest numbers reported by your MT5 connection.
                </p>

                <div className="stats">
                  <div className="stat">
                    <div className="k">Balance</div>
                    <div className="v">{money(snapshot?.balance)}</div>
                  </div>
                  <div className="stat">
                    <div className="k">Equity</div>
                    <div className="v">{money(snapshot?.equity)}</div>
                  </div>
                  <div className="stat">
                    <div className="k">Margin</div>
                    <div className="v">{money(snapshot?.margin)}</div>
                  </div>
                  <div className="stat">
                    <div className="k">Free margin</div>
                    <div className="v">{money(snapshot?.free_margin)}</div>
                  </div>
                </div>

                <div className="mini">
                  <div>
                    <span className="miniK">MT5 Login:</span>{" "}
                    <span className="miniV">{snapshot?.mt5_login || "—"}</span>
                  </div>
                  <div>
                    <span className="miniK">Last update:</span>{" "}
                    <span className="miniV">
                      {snapshot?.created_at
                        ? new Date(snapshot.created_at).toLocaleString()
                        : "—"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Weekly */}
              <section className="card">
                <div className="titleRow">
                  <h2>Weekly Profit Share</h2>
                  <div className="weekTag">
                    Week: {weekStartISO} → {weekEndISO}
                  </div>
                </div>

                <p className="muted">
                  We charge <b>30% of weekly realised trading profit</b> (only
                  profits). Deposits/withdrawals don’t affect this.
                </p>

                <div className="weeklyGrid">
                  <div className="weeklyBox">
                    <div className="k">Realised PnL (this week)</div>
                    <div
                      className={`v ${
                        weekly?.pnl > 0 ? "pos" : weekly?.pnl < 0 ? "neg" : ""
                      }`}
                    >
                      {weekly ? money(weekly.pnl) : "—"}
                    </div>
                    <div className="hint">
                      Includes profit + swap + commission (net).
                    </div>
                  </div>

                  <div className="weeklyBox">
                    <div className="k">30% Fee Due</div>
                    <div className="v">{weekly ? money(weekly.fee_due) : "—"}</div>
                    <div className="hint">
                      Fee = max(0, pnl) × 30%
                    </div>
                  </div>
                </div>

                <div className="settleRow">
                  <div className="settleLeft">
                    <div className="k">Status</div>
                    <div className="v2">
                      {weekly
                        ? weekly.settled
                          ? "Settled ✅"
                          : "Unsettled"
                        : "Waiting for weekly report…"}
                    </div>
                    {weekly?.settled_at && (
                      <div className="hint">
                        Settled at:{" "}
                        {new Date(weekly.settled_at).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Admin only (optional) */}
                  {isAdmin && (
                    <button
                      className="gold"
                      onClick={settleWeek}
                      disabled={!weekly || weekly?.settled}
                      title="Locks the week as settled"
                    >
                      Settle week
                    </button>
                  )}
                </div>

                <div className="payRow">
                  <button
                    className="primary"
                    type="button"
                    onClick={() =>
                      alert("Card payments are handled manually for now.")
                    }
                  >
                    Pay 30% via Card
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() =>
                      alert("Crypto payments are handled manually for now.")
                    }
                  >
                    Pay 30% via Crypto
                  </button>
                </div>
              </section>

              {/* Motivation */}
              <section className="card">
                <div className="titleRow">
                  <h2>Motivation</h2>
                </div>
                <div className="quote">“{quote}”</div>
                <div className="muted smallText">
                  Quote updates automatically.
                </div>
              </section>
            </section>

            <section className="foot">
              <div className="muted smallText">
                Logged in as <b>{user.email}</b>
              </div>
              <div className="muted smallText">
                This portal doesn’t move money. It only displays reporting and
                fee structure.
              </div>
            </section>
          </>
        )}
      </main>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1b1408, #000);
          color: #f7f0da;
          padding: 18px 14px 44px;
        }

        .topBar {
          max-width: 1100px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .brand img {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          box-shadow: 0 0 26px rgba(230, 195, 106, 0.35);
        }

        .brandName {
          font-weight: 900;
          letter-spacing: 0.02em;
          color: #f5e1a4;
          line-height: 1.1;
        }

        .brandTag {
          font-size: 12px;
          color: #bfae78;
          margin-top: 2px;
        }

        .topRight {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: rgba(0, 0, 0, 0.55);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #33ff86;
          box-shadow: 0 0 14px rgba(51, 255, 134, 0.35);
        }

        .main {
          max-width: 1100px;
          margin: 0 auto;
        }

        .notice {
          margin: 10px auto 14px;
          max-width: 1100px;
        }

        .err,
        .ok {
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.65);
          font-size: 14px;
        }

        .err {
          color: #ffb3b3;
          border-color: rgba(255, 120, 120, 0.4);
        }
        .ok {
          color: #bff7d2;
          border-color: rgba(51, 255, 134, 0.35);
        }

        .grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }

        @media (min-width: 940px) {
          .grid {
            grid-template-columns: 1.15fr 0.85fr;
          }
          .grid > section:nth-child(3) {
            grid-column: 1 / -1;
          }
        }

        .card {
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: radial-gradient(
            circle at top left,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.92)
          );
          padding: 18px 16px 16px;
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
        }

        .titleRow {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        h1 {
          margin: 0;
          color: #f5e1a4;
          font-size: 22px;
        }

        h2 {
          margin: 0;
          color: #f5e1a4;
          font-size: 18px;
        }

        .muted {
          color: #d8d2b6;
          opacity: 0.95;
          font-size: 13px;
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .smallText {
          font-size: 12px;
        }

        .actions {
          display: inline-flex;
          gap: 8px;
          align-items: center;
        }

        .weekTag {
          font-size: 12px;
          color: #bfae78;
          border: 1px solid rgba(230, 195, 106, 0.25);
          padding: 8px 10px;
          border-radius: 999px;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.5);
        }

        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 10px;
        }

        @media (min-width: 520px) {
          .stats {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        .stat {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.62);
          padding: 12px 12px 10px;
        }

        .k {
          font-size: 12px;
          color: #bfae78;
          margin-bottom: 6px;
        }

        .v {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.01em;
          color: #fff;
        }

        .pos {
          color: #bff7d2;
        }

        .neg {
          color: #ffb3b3;
        }

        .mini {
          margin-top: 12px;
          display: grid;
          gap: 6px;
          font-size: 12px;
        }

        .miniK {
          color: #bfae78;
        }
        .miniV {
          color: #f7f0da;
        }

        .weeklyGrid {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr;
          margin-top: 8px;
        }

        @media (min-width: 560px) {
          .weeklyGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .weeklyBox {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.62);
          padding: 12px 12px 10px;
        }

        .hint {
          margin-top: 6px;
          font-size: 12px;
          color: #bfae78;
        }

        .settleRow {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(230, 195, 106, 0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .v2 {
          font-weight: 900;
          color: #fff;
        }

        .payRow {
          margin-top: 12px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .quote {
          font-size: 16px;
          line-height: 1.7;
          padding: 14px 14px;
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.62);
          color: #f7f0da;
        }

        .foot {
          margin-top: 16px;
          display: grid;
          gap: 6px;
          opacity: 0.92;
        }

        .btnRow {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .ghost,
        .gold,
        .primary {
          border: none;
          cursor: pointer;
          border-radius: 14px;
          padding: 12px 14px;
          font-weight: 900;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          user-select: none;
        }

        .ghost {
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(230, 195, 106, 0.25);
          color: #f7f0da;
        }

        .ghost:hover {
          border-color: rgba(230, 195, 106, 0.45);
        }

        .ghost.small {
          padding: 10px 12px;
          font-size: 12px;
          border-radius: 12px;
        }

        .gold {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #121212;
          box-shadow: 0 0 24px rgba(230, 195, 106, 0.18);
        }

        .gold:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .primary {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #121212;
        }
      `}</style>
    </div>
  );
}
