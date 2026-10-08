"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";
import Scramble from "../../components/Scramble";
import BalanceChart from "../../components/BalanceChart";
import { SITE } from "../../lib/site";
import { TRACK, TRADES } from "../../lib/track";
import { replayTrades, money, pct } from "../../lib/replay";

const QUOTES = [
  "Discipline over dopamine.",
  "Risk before reward.",
  "Process over outcomes.",
  "Patience compounds.",
  "Consistency creates inevitability.",
];

const TABS = [
  { k: "strategy", t: "Strategy" },
  { k: "fee", t: "Fee calculator" },
  { k: "manage", t: "Manage your copy" },
];

export default function MembersArea() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("strategy");
  const [quote, setQuote] = useState(QUOTES[0]);

  // Fee calculator inputs (mirrors the Exness performance-fee formula)
  const [invested, setInvested] = useState("500");
  const [equity, setEquity] = useState("560");
  const [paid, setPaid] = useState("0");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data?.user) router.push("/login");
      else setUser(data.user);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session?.user) router.push("/login");
      else setUser(session.user);
    });
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Growth of $1,000 across the real public signals: risk starts at $1,000 ÷ 14 and doubles each time the account doubles, before fees
  const growth = useMemo(() => replayTrades(1000, TRADES, 14, 0, "step"), []);
  const totalReturn = (growth.end / 1000 - 1) * 100;

  const fee = useMemo(() => {
    const inv = parseFloat(invested) || 0;
    const eq = parseFloat(equity) || 0;
    const pd = parseFloat(paid) || 0;
    const rate = SITE.performanceFeePct / 100;
    const due = Math.max(0, (eq + pd - inv) * rate - pd);
    return { due, keep: eq - due, profit: eq + pd - inv };
  }, [invested, equity, paid]);

  if (!user) {
    return (
      <main className="load">
        <span className="fx-eyebrow">Members area</span>
        <p>Checking your session…</p>
        <style jsx>{`
          .load {
            min-height: 60vh;
            display: grid;
            place-content: center;
            justify-items: center;
            gap: 10px;
            color: var(--muted);
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="mem">
      <div className="mem-in">
        <header className="top">
          <a href="/" className="brand">
            <img src="/emblem.jpg" alt="" />
            <span>
              <b>Members area</b>
              <small>{user.email}</small>
            </span>
          </a>
          <button type="button" className="btn-ghost" onClick={logout}>
            Log out
          </button>
        </header>

        <div className="hello fx-glass fx-hud">
          <div>
            <span className="fx-eyebrow">Welcome back</span>
            <Scramble as="h1" text={quote} className="hello-q" />
          </div>
          <div className="btn-row">
            {SITE.strategyUrl ? (
              <a className="btn" href={SITE.strategyUrl} target="_blank" rel="noopener noreferrer">
                Open our strategy
              </a>
            ) : (
              <span className="btn is-off">Strategy link coming soon</span>
            )}
            <a className="btn-ghost" href="/simulator">
              Simulator
            </a>
          </div>
        </div>

        <div className="seg" role="tablist" aria-label="Members sections">
          {TABS.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)}>
              {t.t}
            </button>
          ))}
        </div>

        {tab === "strategy" && (
          <section className="pane" key="strategy">
            <p className="fx-notice">
              <b>Real trades</b>
              <span>
                The {TRACK.trades} free signals posted in the {TRACK.channel} Telegram channel, {TRACK.from} – {TRACK.to}, each
                posted before its result. Check every one in the <a href="/simulator">simulator’s trade log</a>.
              </span>
            </p>
            <div className="stats">
              <div className="stat fx-tilt"><span>Win rate</span><b className="up">{Math.round((TRACK.wins / TRACK.trades) * 100)}%</b><small>At 1:1 reward to risk</small></div>
              <div className="stat fx-tilt"><span>Wins / losses</span><b>{TRACK.wins} / {TRACK.losses}</b><small>{TRACK.trades} signals</small></div>
              <div className="stat fx-tilt"><span>Growth at ÷14</span><b className={totalReturn >= 0 ? "up" : "down"}>{pct(totalReturn)}</b><small>Before fees</small></div>
              <div className="stat fx-tilt"><span>Max drawdown</span><b className="down">-{(growth.maxDD * 100).toFixed(1)}%</b><small>Largest dip from a peak</small></div>
            </div>
            <div className="panel fx-glass">
              <div className="panel-head">
                <h2>Growth of $1,000</h2>
                <span>Capital ÷ 14, doubled at 2× · before fees</span>
              </div>
              <BalanceChart values={growth.points.map((p) => p.bal)} labels={growth.points.map((p) => p.label)} marks={growth.doublings.map((d, k) => ({ index: d.index, text: `${2 ** (k + 1)}×` }))} />
            </div>
          </section>
        )}

        {tab === "fee" && (
          <section className="pane" key="fee">
            <div className="panel fx-glass fx-hud feegrid">
              <div className="inputs">
                <p className="muted">
                  Enter the figures from your Exness Social Trading investment to see the fee at the next monthly
                  billing, using the same formula Exness uses.
                </p>
                <div>
                  <label className="fx-label" htmlFor="f-inv">Amount invested ($)</label>
                  <input id="f-inv" className="fx-input" type="number" inputMode="decimal" value={invested} onChange={(e) => setInvested(e.target.value)} />
                </div>
                <div>
                  <label className="fx-label" htmlFor="f-eq">Current investment equity ($)</label>
                  <input id="f-eq" className="fx-input" type="number" inputMode="decimal" value={equity} onChange={(e) => setEquity(e.target.value)} />
                </div>
                <div>
                  <label className="fx-label" htmlFor="f-paid">Fees already paid ($)</label>
                  <input id="f-paid" className="fx-input" type="number" inputMode="decimal" value={paid} onChange={(e) => setPaid(e.target.value)} />
                </div>
              </div>
              <div className="out">
                <div><span>Profit so far</span><b className={fee.profit >= 0 ? "" : "down"}>{money(fee.profit)}</b></div>
                <div><span>Fee due ({SITE.performanceFeePct}%)</span><b>{money(fee.due)}</b></div>
                <div className="hl"><span>You keep</span><b className="up">{money(fee.keep)}</b></div>
                <p className="formula">
                  (equity + fees paid − invested) × {SITE.performanceFeePct}% − fees paid
                </p>
              </div>
            </div>
          </section>
        )}

        {tab === "manage" && (
          <section className="pane manage" key="manage">
            {[
              { t: "Watch your trades", d: "Every copied trade appears live in the Exness Social Trading app under your investment." },
              { t: "Add or remove funds", d: "Top up or withdraw part of your investment from the app. Copying adjusts to the new amount." },
              { t: "Stop copying", d: "Press Stop copying on your investment. Open trades close and the money returns to your wallet." },
              { t: "Get help", d: `Questions about your copy or the fee? Email ${SITE.supportEmail}.` },
            ].map((c) => (
              <div key={c.t} className="m-card fx-glass fx-tilt">
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      <style jsx>{`
        .mem {
          padding: 24px 16px 90px;
        }
        .mem-in {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          gap: 20px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .brand img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 0 1px var(--gold-deep);
        }
        .brand span {
          display: grid;
          min-width: 0;
        }
        .brand b {
          font: 600 18px/1.2 var(--display);
        }
        .brand small {
          color: var(--muted);
          font: 400 12px/1.4 var(--mono);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hello {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 26px;
        }
        .hello :global(.hello-q) {
          display: block;
          margin: 10px 0 0;
          font-size: clamp(28px, 4.5vw, 44px);
        }
        .seg {
          display: flex;
          flex-wrap: wrap;
          width: max-content;
          max-width: 100%;
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.6);
        }
        .seg button {
          background: transparent;
          color: var(--muted);
          border-radius: 0;
          padding: 14px 18px;
          font: 600 13px/1 var(--body);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .seg button:hover {
          box-shadow: none;
          color: var(--gold);
        }
        .seg button[aria-selected="true"] {
          background: var(--gold);
          color: #0b0b0b;
        }
        .pane {
          display: grid;
          gap: 16px;
          animation: fx-rise 0.4s ease-out;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 760px) {
          .stats {
            grid-template-columns: 1fr 1fr;
          }
        }
        .stat {
          display: grid;
          gap: 8px;
          padding: 18px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: rgba(12, 11, 8, 0.66);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .stat span {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .stat b {
          font: 600 clamp(24px, 4vw, 32px) / 1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .stat small {
          font: 400 12px/1.3 var(--mono);
          color: var(--muted);
        }
        .up {
          color: var(--gold);
        }
        .down {
          color: var(--loss);
        }
        .panel {
          padding: 22px;
          display: grid;
          gap: 14px;
          min-width: 0;
        }
        .panel-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .panel-head h2 {
          margin: 0;
          font-size: 24px;
        }
        .panel-head span {
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .feegrid {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .feegrid {
            grid-template-columns: 1fr;
          }
        }
        .inputs {
          display: grid;
          gap: 16px;
        }
        .muted {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .out {
          display: grid;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .out div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding: 18px;
          background: rgba(8, 7, 5, 0.75);
        }
        .out span {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .out b {
          font: 600 26px/1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .out .hl {
          background: rgba(230, 195, 106, 0.1);
        }
        .formula {
          margin: 0;
          padding: 12px 18px;
          background: rgba(8, 7, 5, 0.75);
          font: 400 12px/1.5 var(--mono);
          color: var(--muted);
        }
        .manage {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (max-width: 700px) {
          .manage {
            grid-template-columns: 1fr;
          }
        }
        .m-card {
          display: grid;
          gap: 8px;
          padding: 22px;
          border-radius: var(--radius);
        }
        .m-n {
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .m-card h3 {
          margin: 0;
          font-size: 22px;
        }
        .m-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .is-off {
          opacity: 0.5;
          cursor: default;
        }
      `}</style>
    </main>
  );
}
